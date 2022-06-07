import json
from multiprocessing import context
from api.serializers.users import DoctorInfoSerializer, PatientInfoSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import *
from .helpers import OK, BadRequestException, Deleted, IsDoctor, NotFoundException, SerializerErrors, UnAuthorizedException, is_patient_in_danger_by_doctor, list_to_object

class Logged(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return OK(UserSerializer(request.user).data)

class Users(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        kind = request.GET.get("kind")
        print("kind:", kind)
        if kind=="doctors":
            print("getting doctors")
            users = User.objects.filter(is_doctor=True)
        else:
            users = User.objects.all()
        return OK(UserSerializer(users, many=True).data)
    
    def post(self, request):
        try:
            body = json.loads(request.body)
        except Exception:
            return BadRequestException("Invalid body structure")
        password, confirmation = body.get("password"), body.get("confirmation")
        if password==confirmation and password is not None:
            body['username'] = body.get('email')
            user = UserSerializer(data=body)
            if user.is_valid():
                user.save()
                id = user.data.get('id')
                new_user = User.objects.get(id=id)
                new_user.set_password(password)
                new_user.save()
                refresh = RefreshToken.for_user(new_user)
                res = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
                return OK(res)
            return SerializerErrors(user)
        return BadRequestException("Password and confirmation must be the same")

class OneUser(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        return OK(UserSerializer(user).data)
    
    def handle_update(self, request, id, kind="update"):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        if request.user!=user:
            return UnAuthorizedException()
        if kind=="delete":
            user.delete()
            return Deleted()
        try:
            body = json.loads(request.body)
        except Exception:
            return BadRequestException("Invalid body structure")

        # username will always be the same with the email
        body['username'] = body.get('email') or user.username
        # cannot change
        body['is_doctor'] = user.is_doctor
        
        # build (create or merge) the user info serializer
        if user.is_doctor:
            info_data = body.get("doctor_info")
            if info_data:
                if user.doctor_info:
                    info = DoctorInfoSerializer(user.doctor_info, data=info_data, partial=True)
                else:
                    info = DoctorInfoSerializer(data=info_data, partial=True)
        else:
            info_data = body.get("patient_info")
            if info_data:
                if user.patient_info:
                    print("merging")
                    info = PatientInfoSerializer(user.patient_info, data=info_data, partial=True)
                else:
                    print("creating")
                    info = PatientInfoSerializer(data=info_data, partial=True)
        if info_data and not info.is_valid():
            return SerializerErrors(info)
            
        user = UserSerializer(user, data=body, partial=True)
        if user.is_valid():
            new_user = user.save()
            if info_data:
                new_info = info.save()
                # attach the info object to the user
                if new_user.is_doctor:
                    new_user.doctor_info = new_info
                else:
                    new_user.patient_info = new_info
                new_user.save()
            
            return OK(UserSerializer(new_user).data)
        return SerializerErrors(user)

    def put(self, request, id):
        return self.handle_update(request, id)
    
    def delete(self, request, id):
        return self.handle_update(request, id, "delete")

def get_patients(doctor):
    messages = doctor.received_messages.all()
    patients = list(set([message.sender for message in messages]))
    return patients

class DoctorPatients(APIView):
    permission_classes = [IsDoctor]

    def get(self, request, id):
        try:
            doctor = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("Doctor", id)
        # patients of a doctor are the users that have sent him/her a message
        patients = get_patients(request.user)
        patients = UserSerializer(
            patients,
            many=True,
            context={
                'compute_danger': True,
                'request_user': request.user,
            }
        ).data
        return OK(patients)

class DoctorSummary(APIView):
    permission_classes = [IsDoctor]


    def get(self, request):
        
        def is_in_danger(patient):
            return patient.get('danger') and patient.get('danger').get('in_danger')

        def should_notify(patient):
            print("DANGER::", patient.get('danger'))
            return patient.get('danger') and patient.get('danger').get('receive_notification')

        patients = get_patients(request.user)
        patients = UserSerializer(
            patients,
            many=True,
            context={
                'compute_danger': True,
                'request_user': request.user,
            }
        ).data
        print(json.dumps(patients, indent=2))
        total = len(patients)
        in_danger = len(list(filter(is_in_danger, patients)))
        unseen_messages = request.user.received_messages.filter(seen=False).count()
        notifications = list(filter(should_notify, patients))

        return OK({
            "patients_total": total,
            "patients_in_danger": in_danger,
            "unseen_messages": unseen_messages,
            "notifications": notifications,
        })