import json
from rest_framework.views import APIView
from api.models import Note, User
from api.serializers.notes import NoteSerializer
from api.views_.helpers import OK, BadRequestException, Deleted, IsDoctor, NotFoundException, SavedSuccessfully, SerializerErrors, UnAuthorizedException

class PatientNotes(APIView):
    permission_classes = [IsDoctor]

    def get(self, request, id):
        try:
            patient = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        notes = patient.received_notes.order_by('-datetime')
        return OK(NoteSerializer(notes, many=True).data)


    def post(self, request, id):
        try:
            patient = User.objects.get(id=id)
        except User.DoesNotExist:
            return NotFoundException("User", id)
        if patient.is_doctor:
            return BadRequestException("You can post notes only on patients profiles")
        body = json.loads(request.body)
        note = Note(patient=patient, doctor=request.user)
        note = NoteSerializer(note, data=body)
        if note.is_valid():
            note.save()
            return SavedSuccessfully()
        return SerializerErrors(note)

class OneNote(APIView):
    permission_classes = [IsDoctor]

    def change(self, request, id, kind="delete"):
        try:
            note = Note.objects.get(id=id)
        except Note.DoesNotExist:
            return NotFoundException("Note", id)
        if not request.user==note.doctor:
            return UnAuthorizedException()
        if kind=="delete":
            note.delete()
            return Deleted()
        data = json.loads(request.body)
        note = NoteSerializer(note, data=data)
        if note.is_valid():
            note.save()
            return SavedSuccessfully()
        return SerializerErrors(note)
        
    def put(self, request, id):
        return self.change(request, id, "update")

    def delete(self, request, id):
        return self.change(request, id, "delete")