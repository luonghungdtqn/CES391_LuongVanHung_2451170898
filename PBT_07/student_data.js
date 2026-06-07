const students = [
  { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
  { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
  { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
  { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
  { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
  { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
  { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
  { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

for (let i = 0; i < students.length; i++) {
  let tb =
    students[i].math * 0.4 + students[i].physics * 0.3 + students[i].cs * 0.3;

  students[i].average = tb.toFixed(1);

  if (tb >= 8) {
    students[i].rank = "Giỏi";
  } else if (tb >= 6.5) {
    students[i].rank = "Khá";
  } else if (tb >= 5) {
    students[i].rank = "Trung bình";
  } else {
    students[i].rank = "Yếu";
  }
}

console.log("STT | Tên | TB | Xếp loại");

for (let i = 0; i < students.length; i++) {
  console.log(
    i + 1,
    "|",
    students[i].name,
    "|",
    students[i].average,
    "|",
    students[i].rank,
  );
}

let gioi = 0;
let kha = 0;
let trungBinh = 0;
let yeu = 0;

for (let i = 0; i < students.length; i++) {
  if (students[i].rank === "Giỏi") {
    gioi++;
  } else if (students[i].rank === "Khá") {
    kha++;
  } else if (students[i].rank === "Trung bình") {
    trungBinh++;
  } else {
    yeu++;
  }
}

console.log("Giỏi:", gioi);
console.log("Khá:", kha);
console.log("Trung bình:", trungBinh);
console.log("Yếu:", yeu);

let max = students[0];
let min = students[0];

for (let i = 1; i < students.length; i++) {
  if (students[i].average > max.average) {
    max = students[i];
  }

  if (students[i].average < min.average) {
    min = students[i];
  }
}

console.log("Cao nhất:", max.name, "-", max.average);
console.log("Thấp nhất:", min.name, "-", min.average);

let totalMath = 0;
let totalPhysics = 0;
let totalCS = 0;

for (let i = 0; i < students.length; i++) {
  totalMath += students[i].math;
  totalPhysics += students[i].physics;
  totalCS += students[i].cs;
}

console.log("TB Toán:", (totalMath / students.length).toFixed(2));
console.log("TB Physics:", (totalPhysics / students.length).toFixed(2));
console.log("TB CS:", (totalCS / students.length).toFixed(2));

let maleTotal = 0;
let maleCount = 0;
let femaleTotal = 0;
let femaleCount = 0;

for (let i = 0; i < students.length; i++) {
  if (students[i].gender === "M") {
    maleTotal += Number(students[i].average);
    maleCount++;
  } else {
    femaleTotal += Number(students[i].average);
    femaleCount++;
  }
}

console.log("TB Nam:", (maleTotal / maleCount).toFixed(2));
console.log("TB Nữ:", (femaleTotal / femaleCount).toFixed(2));
