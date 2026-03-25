from django.shortcuts import render
from django.core.mail import send_mail
from .models import Contact
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

def home(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        # Save in DB
        Contact.objects.create(
            name=name,
            email=email,
            message=message
        )

        try:
            send_mail(
                f"Message from {name}",
                message,
                'antimankitlpu@gmail.com',  # sender
                ['antimankitlpu@gmail.com'],  # receiver
                fail_silently=False,
            )
            return render(request, 'index.html', {'msg': 'Message Sent ✅'})
        except Exception as e:
            return render(request, 'index.html', {'msg': f'Error: {e}'})

    return render(request, 'index.html')
print("MAIL SENT SUCCESSFULLY")