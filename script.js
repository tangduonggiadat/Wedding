
const button = document.getElementById("footer");

// Lấy ra tất cả các section trên trang web
const sections = document.querySelectorAll("section");

// Lưu giữ trạng thái của việc kiểm tra xem trang web có đang ở cuối hay không
let isAtBottom = false;

// Hàm kiểm tra xem trang web đang ở cuối hay không
function checkIfAtBottom() {
  // Lấy ra kích thước của cửa sổ trình duyệt
  const windowHeight = window.innerHeight;
  
  // Lấy ra kích thước của toàn bộ trang web
  const documentHeight = document.documentElement.scrollHeight;

  // Tính toán giá trị scrollTop và scrollBottom
  const scrollTop = window.pageYOffset;
  const scrollBottom = scrollTop + windowHeight;

  // Kiểm tra nếu scrollBottom bằng với documentHeight thì đang ở cuối trang
  if (scrollBottom === documentHeight) {
    // Nếu trang web đang ở cuối và chưa được đánh dấu là ở cuối trang, in ra thông báo và cập nhật trạng thái
    if (!isAtBottom) {
      button.style.display="block"
      isAtBottom = true;
    }
  } else {
    // Nếu không ở cuối trang, đánh dấu lại là chưa ở cuối trang
    isAtBottom = false;
    button.style.display="none"
  }
}

// Gọi hàm kiểm tra xem trang web đang ở cuối hay không mỗi khi có sự kiện scroll
window.addEventListener("scroll", () => {
  window.requestAnimationFrame(checkIfAtBottom);
});

// Gọi hàm kiểm tra xem trang web đang ở cuối hay không khi tải trang web
checkIfAtBottom();




function typeEffect(element, speed) {
  var text = element.innerHTML;
  element.innerHTML = " ";

  var i = 0;
  var timer = setInterval(function () {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// application
var speed = 100;
// var h1 = document.querySelector('h1');
var p = document.getElementById("type");
// var delay = h1.innerHTML.length * speed + speed;

// type affect to header
// typeEffect(h1, speed);
// type affect to body
setTimeout(function () {
  p.style.display = "inline-block";
  typeEffect(p, speed);
});
// calendar

var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 100) || 4000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 150 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 1000;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #1c1c1c }";
  document.body.appendChild(css);
};

/*Slider*/

const slides = document.querySelector(".slider").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const indicator = document.querySelector(".indicator");
let index = 0;

function indicateSlide(element) {
  index = element.id;
  changeSlide();
  updateCircleIndicator();
  resetTimer();
}

function updateCircleIndicator() {
  for (let i = 0; i < indicator.children.length; i++) {
    indicator.children[i].classList.remove("active");
  }
  indicator.children[index].classList.add("active");
}

function prevSlide() {
  if (index == 0) {
    index = slides.length - 1;
  } else {
    index--;
  }
  changeSlide();
}

function nextSlide() {
  if (index == slides.length - 1) {
    index = 0;
  } else {
    index++;
  }
  changeSlide();
}

function changeSlide() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  slides[index].classList.add("active");
}

function resetTimer() {
  // when click to indicator or controls button
  // stop timer
  clearInterval(timer);
  // then started again timer
  timer = setInterval(autoPlay, 2000);
}

function autoPlay() {
  nextSlide();
  updateCircleIndicator();
}

let timer = setInterval(autoPlay, 2000);
$(".parallax-window").parallax({ imageSrc: "/path/to/image.jpg" });


$(function() {
  $(".img-w").each(function() {
    $(this).wrap("<div class='img-c'></div>")
    let imgSrc = $(this).find("img").attr("src");
     $(this).css('background-image', 'url(' + imgSrc + ')');
  })
            
  
  $(".img-c").click(function() {
    let w = $(this).outerWidth()
    let h = $(this).outerHeight()
    let x = $(this).offset().left
    let y = $(this).offset().top
    
    
    $(".active").not($(this)).remove()
    let copy = $(this).clone();
    copy.insertAfter($(this)).height(h).width(w).delay(500).addClass("active")
    $(".active").css('top', y - 8);
    $(".active").css('left', x - 8);
    
      setTimeout(function() {
    copy.addClass("positioned")
  }, 0)
    
  }) 
  
  

  
})

$(document).on("click", ".img-c.active", function() {
  let copy = $(this)
  copy.removeClass("positioned active").addClass("postactive")
  setTimeout(function() {
    copy.remove();
  }, 500)
})


