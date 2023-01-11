"""CubixSCP URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home ),
    path('home', views.home, name="home" ),
    path('about', views.about, name="about"  ),
    path('contact', views.contact,name="contact"),
    path('login', views.login ,name="login"),
    path('reg', views.reg,name="reg"),
    path('homeLogin', views.homeLogin,name="homeLogin" ),
    path('listcom', views.listcom ,name="listcom"),
    path('listsearched', views.listsearch, name="listSearched"),
    path('searched', views.searchedStock ,name="searchedStock"),
    path('stock', views.stock ,name="stock"),
 
]
