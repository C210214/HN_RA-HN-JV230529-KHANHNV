let btnSelector = document.querySelector('button');
let tableSelector = document.querySelector('tbody');
let sortButton = document.querySelector('.sort');
let btnSearch = document.querySelector('.btn_search');
let inputSearch = document.querySelector('.input_search');

let students = [
    {
        id: Date.now(),
        name: 'Rikkei',
        email: 'rikkei@gmail.com',
        phone: '0823868888',
        address: 'Hà Nội',
        sex: 'Nữ'
    },
    {
        id: Date.now(),
        name: 'Academy',
        email: 'academy@gmail.com',
        phone: '0828638888',
        address: 'HCM',
        sex: 'Nam'
    }
];

function showStudent() {
    if (students.length === 0) {
        document.querySelector('.main').classList.add('hide');
        document.querySelector('.empty').style.display = 'block';
        document.querySelector('.empty').innerHTML = '<p>Danh sách học viên của bạn đang rỗng</p>';
    }
    let result ='';
    for(let i = 0; i < students.length; i++){
        result += `<tr>
        <td>${i + 1}</td>
        <td>${students[i].name}</td>
        <td>${students[i].email}</td>
        <td>${students[i].phone}</td>
        <td>${students[i].address}</td>
        <td>${students[i].sex}</td>
        <td>
            <button class="edit" data-id="${students[i].id}">Edit</button>
            <button class="delete" data-id="${students[i].id}">Delete</button>
        </td>
    </tr>`
    }
    tableSelector.innerHTML = result;
}
showStudent();

function addStudent(event) {
    event.preventDefault();
    let formSelector = document.querySelector('form');
    let valueRadio = document.querySelector('.sex-select:checked').value;
    let valueName = document.querySelector('#name').value;
    let valueEmail = document.querySelector('#email').value;
    let valuePhone = document.querySelector('#phone').value;
    let valueAddress = document.querySelector('#address').value;
        let emailTest =/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if(!valueName || !valuePhone.match(vnf_regex) || !valueAddress || !valueEmail.match(emailTest)){
        
        const resetElm = (elm) =>{
            elm.classList.remove("invalid");
        };
        const invalidateElm = (elm) => {
            elm.classList.add("invalid");
        };
        if (!valueName) {
            alert("Tên không được để trống");
            invalidateElm(document.querySelector('#name'));
            
        }else{
            resetElm(document.querySelector('#name'));
        }
        if (!valueEmail.match(emailTest)) {
            alert("Email không đúng định dạng");
            invalidateElm(document.querySelector('#email'));
            
        }else{
            resetElm(document.querySelector('#email'));
        }
        if (!valuePhone.match(vnf_regex)) {
            alert("Số điện thoại không đúng định dạng");
            invalidateElm(document.querySelector('#phone'));
        }else{
            resetElm(document.querySelector('#phone'));
        }
        if (!valueAddress) {
            alert("Địa chỉ không được để trống");
            invalidateElm(document.querySelector('#address'));
            
        }else{
            resetElm(document.querySelector('#address'));
        }
        return;
    } 
    else if(btnSelector.classList.contains('update')){
        let idUpdate = btnSelector.getAttribute('data-id');
        let indexUpdate;
        for (let i = 0; i < students.length; i++) {
            if (students[i].id === +idUpdate) {
                indexUpdate = i;
                break;
            }
        }
        students[indexUpdate].name = valueName;
        students[indexUpdate].email = valueEmail;
        students[indexUpdate].phone = valuePhone;
        students[indexUpdate].address = valueAddress;
        students[indexUpdate].sex = valueRadio;
        showStudent();
        btnSelector.classList.remove('update');
        btnSelector.innerHTML = 'Lưu lại';
        btnSelector.removeAttribute('data-id');
        formSelector.reset();
    }else{
        let objNewStudent = {
            id: Date.now(),
            name: valueName,
            email: valueEmail,
            phone: valuePhone,
            address: valueAddress,
            sex: valueRadio,
        }
        students.push(objNewStudent);
        showStudent();
        formSelector.reset();
        document.querySelector('.main').classList.remove('hide');
        document.querySelector('.empty').style.display = 'none'; 
    }
}
btnSelector.addEventListener('click', addStudent);

function processStudents(event) {
    let clicked = event.target;
    let formSelector = document.querySelector('form');
    event.preventDefault();
    if (clicked.classList.contains('delete')){
        let confirmDelete = confirm('Bạn chắc chắn muốn xóa không ?');
        if(confirmDelete){
            let idDelete = clicked.getAttribute('data-id');
            let indexDelete;
            for (let i = 0; i < students.length; i++) {
                if (students[i].id === +idDelete) {
                    indexDelete = i;
                    break;
                }
            }
            students.splice(indexDelete, 1);
            showStudent();
            btnSelector.classList.remove('update');
            btnSelector.innerHTML = 'Lưu lại';
            btnSelector.removeAttribute('data-id');
            formSelector.reset();
        } 
    }else if(clicked.classList.contains('edit')) {
        let idEdit = clicked.getAttribute('data-id');
        let indexEdit;
        for (let i = 0; i < students.length; i++) {
            if (students[i].id === +idEdit) {
                indexEdit = i;
                break;
            }
        }
        let objectEdit = students[indexEdit];
        document.querySelector('#name').value = objectEdit.name;
        document.querySelector('#email').value = objectEdit.email;
        document.querySelector('#phone').value = objectEdit.phone;
        document.querySelector('#address').value = objectEdit.address;
        document.querySelector(`input[value=${objectEdit.sex}]`).checked = true;
        btnSelector.classList.add('update');
        btnSelector.innerHTML = 'Cập nhập';
        btnSelector.setAttribute('data-id', idEdit);
    }
}
tableSelector.addEventListener('click', processStudents);

function sortStudent() {
    students.sort(
        function(a, b) {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if(nameA < nameB) {
                return -1;
            }
            if(nameA > nameB){
                return 1;
            }
            return 0;
        }
    )
    showStudent();
}
sortButton.addEventListener('click', sortStudent);


function handleSearch() {  
    let valueSearch = inputSearch.value.toLowerCase();
    let studentsSearch = students.filter(
        function(studentCheck){
            return studentCheck.name.toLowerCase().includes(valueSearch);
        }
    );
    let result ='';
    for(let i = 0; i < studentsSearch.length; i++){
        result += `<tr>
        <td>${i + 1}</td>
        <td>${studentsSearch[i].name}</td>
        <td>${studentsSearch[i].email}</td>
        <td>${studentsSearch[i].phone}</td>
        <td>${studentsSearch[i].address}</td>
        <td>${studentsSearch[i].sex}</td>
        <td>
            <button class="edit" data-id="${studentsSearch[i].id}">Edit</button>
            <button class="delete" data-id="${studentsSearch[i].id}">Delete</button>
        </td>
    </tr>`
    }
    tableSelector.innerHTML = result;
}
btnSearch.addEventListener('click', handleSearch);


