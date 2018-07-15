# from django.shortcuts import render

# Create your views here.
# accounts/views.py
from cond.forms import CustomUserCreationForm, CustomUserChangeForm, EditProfileForm
from django.urls import reverse_lazy, reverse
from django.views import generic
from cond.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
# from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect


class SignUp(generic.CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'signup.html'


class EditProfile (LoginRequiredMixin, generic.UpdateView):
    login_url = '/login/'
    model = User
    form_class = CustomUserChangeForm
    success_url = reverse_lazy('home')
    template_name = 'edit.html'

# @login_required()
def edit_profile(request):
    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, instance=request.user)

        if form.is_valid():
            form.save()
            return redirect(reverse('home'))
    else:
        form = CustomUserChangeForm(instance=request.user)
        args = {'form': form}
        return render(request, 'edit.html', args)
