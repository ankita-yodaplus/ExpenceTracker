from rest_framework import serializers
from .models import Expense
from categories.serializers import CategorySerializer
from categories.models import Category

class ExpenseSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )

    class Meta:
        model = Expense
        fields = ['id', 'user', 'category', 'category_id', 'title', 'amount', 'date']
        read_only_fields = ['user']

    def create(self, validated_data):
        category = validated_data.pop('category')
        return Expense.objects.create(category=category, **validated_data)

    def update(self, instance, validated_data):
        category = validated_data.pop('category', None)
        if category:
            instance.category = category
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
