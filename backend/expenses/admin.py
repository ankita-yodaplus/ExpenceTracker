from django.contrib import admin
from .models import Expense

class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('user', 'category', 'title', 'amount', 'date')
    list_filter = ('user', 'category', 'date')
    search_fields = ('title', 'category__name', 'user__username')  # Search by category name and user
    ordering = ('-date',)
    date_hierarchy = 'date'

admin.site.register(Expense, ExpenseAdmin)
# admin.site.register(Category)

