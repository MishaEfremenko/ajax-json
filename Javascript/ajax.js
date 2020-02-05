function getCookie(name) // я без понятия что тут происходит, но вроде работает)))
{
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function delete_cookie ( cookie_name )
{
    var cookie_date = new Date ( );
    cookie_date.setTime ( cookie_date.getTime() - 1 );
    document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

function Get_Formules()// достаём массив с формулами
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET','data.php?'+'num=1');
    xhr.send();
 
    xhr.onreadystatechange=function()
    {
        if(xhr.readyState==4&&xhr.status==200)
        {
            //delete_cookie("user");
            let formules = "user="+xhr.responseText;
            document.cookie=(formules);        }
    }
    setTimeout(function(){   
        if((getCookie("user")==null)||((getCookie("user")==undefined)))
            location.reload();
        formules=(getCookie("user").split("raz"));
        delete formules[formules.length-1];
        for (let i=0;i<formules.length-1;i++)
        formules[i]=JSON.parse(formules[i]);console.log(formules);console.log(formules[0][0])}
        ,200);

}
function Get_Hrefs() // достаём массив со ссылками на картинки
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET','data.php?'+'num=2');
    xhr.send();

    xhr.onreadystatechange=function()
    {
        if(xhr.readyState==4&&xhr.status==200)
        {
            //delete_cookie("href");
            let hrefs = "href="+xhr.responseText;
            document.cookie=(hrefs);
            
        }
    }
    setTimeout(function(){
    if((getCookie("href")==null)||((getCookie("href")==undefined)))
        location.reload();
    hrefs=(getCookie("href").split("raz"));
    for (let i=0;i<hrefs.length-1;i++)
        hrefs[i]=JSON.parse(hrefs[i]);

    delete hrefs[hrefs.length-1];console.log(hrefs);console.log(hrefs[0].name);},200)
    
}

// это нужно только при отладке
let formules;// формулы
let hrefs;// ссылки на картинки

Get_Formules();
Get_Hrefs();

function clearvar(num)// отчищает предложку
{
    document.getElementById("var").innerHTML="";
    if(num!=null)
    {
        cleardown();
        print_from_array(num);
    }
}
function cleardown()// отчищает формулы
{
    document.querySelector("down").innerHTML="";
}
function copy_array(ar)// копирование массива с формулами
{
    let newar=[];
    for (let i = 0;i<ar.length;i++)
    {
        newar.push(ar[i]);
    }
    return newar;
}
function search_parametrs1(val)// предлагаем варианты i,g,k
{
    val=val.toLowerCase()

    let this_formules=copy_array(formules);
    clearvar(null);
    for (let i = 0;i<val.length;i++)
    {
        for (let p = 0;p<this_formules.length-1;p++)
        {
            for(let r=1;r<this_formules[p].length;r++)
            {
                if (this_formules[p][r].znak==val)
                {
                    print_variant(p);
                    this_formules[p]="";
                }
            }
        }
    }
}function search_parametrs2(val)// предлагаем варианты сила тока, сопротивление
{
    val=val.toLowerCase()

    let this_formules=copy_array(formules);
    clearvar(null);
    for (let i = 0;i<val.length;i++)
    {
        for (let p = 0;p<this_formules.length-1;p++)
        {
            for(let r=1;r<this_formules[p].length;r++)
            {
                if (return_part(this_formules[p][r].znach,val.length)==val)
                {
                    print_variant(p);
                    this_formules[p]="";
                }
            }
        }
    }
}
function return_part(value,num_of_chars)// возвращает часть стороки
{
    let returned="";
    for (let i=0;i<num_of_chars;i++)
        returned+=value[i];
    return returned;
}
function search_znach()// кнопка поиска
{
    cleardown();
    clearvar(null);
    let val1=document.getElementById("varpar").value;
    let this_formules=copy_array(formules);
    for (let i = 0;i<val1.length;i++)
    {
        for (let p = 0;p<this_formules.length-1;p++)
        {
            for(let r=1;r<this_formules[p].length;r++)
            {
                if (this_formules[p][r].znak==val1)
                {
                    print_from_array(p);
                    this_formules[p]="";
                }
            }
        }
    }
    let val2=document.getElementById("varznk").value;
    for (let i = 0;i<val2.length;i++)
    {
        for (let p = 0;p<this_formules.length-1;p++)
        {
            for(let r=1;r<this_formules[p].length;r++)
            {
                if (return_part(this_formules[p][r].znach,val2.length)==val2)
                {
                    print_from_array(p);
                    this_formules[p]="";
                }
            }
        }
    }
}

color_array=["#E3B6EE","#BCB6EE","#B6DFEE","#B6EEE3","#C5EEB6","E7EEB6","EECAB6"];

function print_from_array(num) // печатает в блоке down формулу из массива formules с индексом num
{
    let f1=document.createElement("formula");// печатаем название фрмулы
    f1.id="upform";
    f1.innerHTML=formules[num][0];
    document.querySelector("down").appendChild(f1);

    let color_num=0;

    let f2=document.createElement("formula"); // печатаем запись формулы
    let f3=document.createElement("div");// печатаем пояснения
    let client_width=window.innerWidth/formules[num].length;// ширина картинки у клиента
    for (let i=1;i<formules[num].length;i++) // 
    {
        let f_part=document.createElement("img");
        f_part.className="bukva";
        if (formules[num][i].znach!="")
        {
            for (p=0;p<hrefs.length-1;p++)
            {   
                if(formules[num][i].znach== hrefs[p].name)
                {
                    // заполняем f2
                    f_part.src=hrefs[p].href;
                    f_part.width=client_width;
                    f_part.height=client_width;
                    f_part.style.backgroundColor=color_array[color_num];
                    

                    // заполняем f3
                    let f3_part=document.createElement("formula");
                    let kartinka=document.createElement("kartinka_znaka");
                    let poiasnenia=document.createElement("poiasnenia_znaka");

                    kartinka.innerHTML=".";
                    kartinka.style.backgroundColor=color_array[color_num];
                    kartinka.style.backgroundImage="url('"+hrefs[p].href+"')";
                    
                    poiasnenia.innerHTML=hrefs[p].name+"<br>единицы измерения - "+hrefs[p].edinizy;
                    f3_part.appendChild(kartinka);
                    f3_part.appendChild(poiasnenia);
                    if(i>formules[num].length-2)
                        f3_part.id="downform";
                    f3.appendChild(f3_part);

                    color_num++;
                }
            }
        }
        else
        {
            f_part.width=client_width/2;
            f_part.height=client_width;
            f_part.style.backgroundColor="white";
            switch(formules[num][i].znak)
            {
                case '+':
                    f_part.src="znaki/plus.png";
                break;
                case '-':
                    f_part.src="znaki/minus.png";
                break;
                case '*':
                    f_part.src="znaki/ymnoz.png";
                break;
                case '/':
                    f_part.src="znaki/delenie.png";
                break;
                case ')':
                    f_part.src="znaki/skr.png";
                break;
                case '(':
                    f_part.src="znaki/skl.png";
                break;
                case '=':
                    f_part.src="znaki/ravno.png";
                break;
            }
        }
        f2.appendChild(f_part);
    }
    document.querySelector("down").appendChild(f2);
    document.querySelector("down").appendChild(f3);
}
function print_variant(num)  // печатает Т9 с индексом num
{
    let varian = document.createElement("variant");
    varian.addEventListener("click",function(){cleardown();print_from_array(num);clearvar(null)});

    let client_width=window.innerWidth/formules[num].length;// ширина картинки у клиента
    for (let i=1;i<formules[num].length;i++) // 
    {
        let v_part=document.createElement("img");
        v_part.className="varznak";
        if (formules[num][i].znach!="")
        {
            for (p=0;p<hrefs.length-1;p++)
            {   
                if(formules[num][i].znach== hrefs[p].name)
                {

                    v_part.src=hrefs[p].href;
                    v_part.width=client_width;
                    v_part.height=client_width;
                    v_part.style.backgroundColor="white";
                    
                }
            }
        }
        else
        {
            v_part.width=client_width/2;
            v_part.height=client_width;
            v_part.style.backgroundColor="white";
            switch(formules[num][i].znak)
            {
                case '+':
                    v_part.src="znaki/plus.png";
                break;
                case '-':
                    v_part.src="znaki/minus.png";
                break;
                case '*':
                    v_part.src="znaki/ymnoz.png";
                break;
                case '/':
                    v_part.src="znaki/delenie.png";
                break;
                case ')':
                    v_part.src="znaki/skr.png";
                break;
                case '(':
                    v_part.src="znaki/skl.png";
                break;
                case '=':
                    v_part.src="znaki/ravno.png";
                break;
            }
        }
        varian.appendChild(v_part);
    }
    document.querySelector("varianti").appendChild(varian);
}