// bài 1
let array = [2,66,33,7,8,45,35,87,16,29];
function maxArray() {
    let max = array[0];
    for (let i = 1; i < array.length; i++){
        if(array[i] > max){
            max = array[i];
        }
    }
    return max;
}
console.log('giá trị lớn nhất là ' + maxArray(array));


// bài 2
let textInput = prompt('Bài2: Hãy nhập một chuỗi các ký tự');
function capitalization(text){
    let textTrim = text.trim();
    let lowText = textTrim.toLowerCase();
    let arr = lowText.split(' ');
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
    }
      return arr.join(" ");
}
console.log(capitalization(textInput));


// bài 3
let year = +prompt('Bài3: Nhập năm bạn muốn tìm');
let month = +prompt('Bài3: Nhập tháng bạn muốn tìm');
const get_day_of_month = (year, month) => {
    return new Date(year, month, 0).getDate();
};
console.log(get_day_of_month(year, month));


// bài 4
// cách 1:dùng hàm sort
let numberArrayC1 = [13, 20, 41, 32, 32, 27, 10, 26];
numberArrayC1.sort(function(a, b) {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
});
console.log(numberArrayC1);
// cách 2: không dùng hàm sort
let numberArrayC2 = [13, 20, 41, 32, 32, 27, 10, 26];
for(let i = 0; i < numberArrayC2.length; i++){
    let idMin = i;
    for(j = 0; j < numberArrayC2.length; j++){
        if(numberArrayC2[j] < numberArrayC2[idMin]){
            let idMin = j;
            let stt = numberArrayC2[i];
            numberArrayC2[i] = numberArrayC2[idMin];
            numberArrayC2[idMin] = stt;
        }
    }
}
console.log(numberArrayC2);


