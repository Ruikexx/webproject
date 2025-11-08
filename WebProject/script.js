// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, checking Swiper availability...');
  
  // 检查Swiper是否可用
  if (typeof Swiper === 'undefined') {
    console.error('Swiper is not loaded!');
    return;
  }
  const cornerLinks = document.querySelectorAll('.corner-nav .link');
  console.log('Swiper is available, initializing...');
 
  // ★ 高亮当前对应的 nav（0=主页时不高亮任何一个；1..4 高亮对应的那个）
  function updateCornerNav(activeIndex){
    cornerLinks.forEach(link => {
      const target = Number(link.dataset.slide); // 1..4
      if (activeIndex > 0 && target === activeIndex) {
        link.classList.add('is-active');
        link.setAttribute('aria-current','page');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });
  }


  // 初始化 Swiper
  const swiper = new Swiper('.mySwiper', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: false, // 禁用Swiper的鼠标滚轮
    keyboard: {
      enabled: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    allowTouchMove: true,
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    on: {
      init: function () {
        updateCornerNav(this.activeIndex);
      },
      slideChange: function () {
        updateCornerNav(this.activeIndex);
      }
    }
  });

  // 处理四角导航点击事件
  document.querySelectorAll('.corner-nav .link').forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const slideIndex = Number(link.dataset.slide);
      if (Number.isNaN(slideIndex)) return;  
      console.log('Navigating to slide:', slideIndex);
      swiper.slideTo(slideIndex);
    });
  });

  // 自定义鼠标滚轮事件处理
  let isScrolling = false;
  document.addEventListener('wheel', function(e) {
    e.preventDefault();
    
    if (isScrolling) return;
    
    console.log('Wheel event detected:', e.deltaY);
    
    if (e.deltaY > 0) {
      // 向下滚动 - 下一个slide
      console.log('Scrolling down - next slide');
      swiper.slideNext();
    } else if (e.deltaY < 0) {
      // 向上滚动 - 上一个slide
      console.log('Scrolling up - previous slide');
      swiper.slidePrev();
    }
    
    // 防止快速滚动
    isScrolling = true;
    setTimeout(() => {
      isScrolling = false;
    }, 500);
  });

  // 添加键盘事件监听
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') {
      console.log('Arrow down pressed');
      swiper.slideNext();
    } else if (e.key === 'ArrowUp') {
      console.log('Arrow up pressed');
      swiper.slidePrev();
    }
  });
});
  