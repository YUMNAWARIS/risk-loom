from django.shortcuts import render
import sqlite3
import yfinance as yf

def home(request):
    return render(request,'home.html')

def about(request):
    return render(request,'about.html')

def contact(request):
    return render(request,'contact.html')

def reg(request):
    return render(request, 'reg.html')

def login(request):
    return render(request,'login.html')

def homeLogin(request):
    return render(request,'homeLogin.html')

def listcom(request):
    with sqlite3.connect("./stock_market.db") as con:
        c = con.cursor()
        a=[]
        col = c.execute("select * from Stock").fetchall()
        for e in col:
            a.append(dict(zip(["ID","Sym","Name"],e)))
        context = {"col":a}
    return render(request, 'list.html',context)

def listsearch(request):
    if  (request.method == 'POST'):
        search = request.POST["searched"]
        search = str(search)

        with sqlite3.connect("./stock_market.db") as con:
            c = con.cursor()
            a=[]
            if search == "a":
                col = c.execute("select * from Stock where symbol like 'a%'").fetchall()
            elif search == "b":
                col = c.execute("select * from Stock where symbol like 'b%'").fetchall()
            else:
                col = c.execute("select * from Stock where symbol like 'y%'").fetchall()
            for e in col:
                a.append(dict(zip(["ID","Sym","Name"],e)))
            context = {"col":a}
        return render(request, 'list.html',context)
    


def searchedStock(request):
        if  (request.method == 'POST'):
            search = request.POST["searched"]
            search = str(search)

        with sqlite3.connect("./stock_market.db") as con:
            c = con.cursor()
            a=[]
            if search == "a":
                col = c.execute("select * from Stock where symbol like 'a%'").fetchall()
            elif search == "b":
                col = c.execute("select * from Stock where symbol like 'b%'").fetchall()
            else:
                col = c.execute("select * from Stock where symbol like 'y%'").fetchall()
            for e in col:
                a.append(dict(zip(["ID","Sym","Name"],e)))
            context = {"col":a}
        return render(request, 'list.html',context)
    


def stock(request):
    m=[]
    z=[]
    with sqlite3.connect("./stock_market.db") as con:
        c = con.cursor()
        comp = c.execute("select Symbol from Stock").fetchall()
        for i in range(0,10):
            m.append(comp[i][0])           
            tick = m[i] #symbol
            asd = yf.Ticker(tick) #obj
            download = yf.download(tick) #download data
            ta = download.tail(1) #recent data one row
            b = ta.values.tolist() 
            z.append(dict(zip(["open","high","low","close","adj","vol"],b[0])))
        context ={"tail":z,"sym":m}
    
    return render(request, 'stock.html', context)

