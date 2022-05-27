from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from api.models import LimitsGroup, UserMetricsGroup
from api.serializers.doctors import BriefDoctorSerializer

def OK(resp):
    return Response(resp, status.HTTP_200_OK)

def NotFoundException(name, id):
    return Response(f"{name} '{id}' does not exist", status.HTTP_404_NOT_FOUND)

def BadRequestException(msg):
    return Response(msg, status.HTTP_400_BAD_REQUEST)

def UnAuthorizedException():
    return Response("Unauthorized", status.HTTP_401_UNAUTHORIZED)

def SerializerErrors(serializer):
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

def Deleted():
    return OK("Deleted successfully")

def SavedSuccessfully():
    return OK("Saved successfully")

class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_doctor

class IsPatient(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and not request.user.is_doctor

def list_to_object(l, key_getter, val_getter):
    obj = {}
    for item in l:
        print("item:", item)
        key = key_getter(item)
        print("key:", key)
        val = val_getter(item)
        print("val:", val)
        obj[key] = val
        print(obj)
    return obj

def is_metric_group_in_danger(metrics_group, doctor):
    limits_group = LimitsGroup.objects \
        .filter(patient__id=metrics_group.user.id, doctor=doctor) \
        .first()
    in_danger = False
    in_danger_metrics = []
    receive_notification = limits_group.receive_notification if limits_group else False
    if metrics_group and limits_group:
        metrics_group = list_to_object(
            l=metrics_group.metrics.all(),
            key_getter=lambda obj: obj.metric.name,
            val_getter=lambda obj: obj.value
        )
        limits_group = list_to_object(
            l=limits_group.limits.all(),
            key_getter=lambda obj: obj.metric.name,
            val_getter=lambda obj: ({
                "lower_limit": obj.lower_limit,
                "upper_limit": obj.upper_limit,
            })
        )
        for metric in metrics_group:
            value = metrics_group.get(metric)
            limit = limits_group.get(metric)
            if limit is not None and value is not None:
                lower = limit.get('lower_limit')
                upper = limit.get('upper_limit')
                if lower is not None and upper is not None:
                    if not lower<=value<=upper:
                        in_danger = True
                        in_danger_metrics.append(metric)
    print("GROUP::", limits_group)
    return in_danger, in_danger_metrics, receive_notification

def format_metrics_group_danger(request_user, group):
    res = {
        "in_danger": False,
        "in_danger_metrics": set(),
        "receive_notification": False,
        "details": [],
    }
    if request_user.is_doctor:
        in_danger, in_danger_metrics, receive_notification = is_metric_group_in_danger(
            group,
            doctor=request_user,
        )
        res['in_danger'] = in_danger
        res['in_danger_metrics'] = in_danger_metrics
        res['receive_notification'] = receive_notification
    else:
        in_danger = False
        danger_details = []
        in_danger_metrics = set()
        sent_messages = group.user.sent_messages.all()
        my_doctors = list(set([message.receiver for message in sent_messages]))
        for doctor in my_doctors:
            in_danger_d, in_danger_metrics_d, _ = is_metric_group_in_danger(
                group,
                doctor,
            )
            in_danger = in_danger_d if in_danger_d else in_danger
            if in_danger_metrics_d:
                in_danger_metrics = in_danger_metrics.union(
                    in_danger_metrics_d
                )
                danger_details.append({
                    "doctor": BriefDoctorSerializer(doctor).data,
                    "metrics": in_danger_metrics_d
                })
        res['in_danger'] = in_danger
        res['in_danger_metrics'] = in_danger_metrics
        res['details'] = danger_details
    return res

def is_patient_in_danger_by_doctor(patient, doctor):
    metrics_group = UserMetricsGroup.objects.filter(user=patient).last()
    return format_metrics_group_danger(
        request_user=doctor,
        group=metrics_group
    )

def is_patient_in_danger_general(patient):
    metrics_group = UserMetricsGroup.objects.filter(user=patient).last()
    return format_metrics_group_danger(
        request_user=patient,
        group=metrics_group
    )