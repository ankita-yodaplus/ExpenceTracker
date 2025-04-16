from rest_framework import viewsets, permissions
from .models import Expense
from .serializers import ExpenseSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only expenses belonging to the authenticated user
        return Expense.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Set the logged-in user as the expense owner
        serializer.save(user=self.request.user)
