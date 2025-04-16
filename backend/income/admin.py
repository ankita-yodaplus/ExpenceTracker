from django.contrib import admin
from .models import Income

@admin.register(Income)
class IncomeAdmin(admin.ModelAdmin):
    list_display = ('user', 'source', 'amount', 'date', 'category')
    list_filter = ('date', 'category')
    search_fields = ('source', 'category__name', 'user__username')
