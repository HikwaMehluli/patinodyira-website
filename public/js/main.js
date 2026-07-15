(function () {
	"use strict";

	/**
	 * Apply .scrolled class to the body as the page is scrolled down
	 */
	function toggleScrolled() {
		const selectBody = document.querySelector('body');
		const selectHeader = document.querySelector('#header');
		if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
		window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
	}

	document.addEventListener('scroll', toggleScrolled);
	window.addEventListener('load', toggleScrolled);

	/**
	 * Mobile nav toggle
	 */
	const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

	function mobileNavToogle() {
		document.querySelector('body').classList.toggle('mobile-nav-active');
		mobileNavToggleBtn.classList.toggle('bi-list');
		mobileNavToggleBtn.classList.toggle('bi-x');
	}
	mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

	/**
	 * Hide mobile nav on same-page/hash links
	 */
	document.querySelectorAll('#navmenu a').forEach(navmenu => {
		navmenu.addEventListener('click', () => {
			if (document.querySelector('.mobile-nav-active')) {
				mobileNavToogle();
			}
		});

	});

	/**
	 * Toggle mobile nav dropdowns
	 */
	document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
		navmenu.addEventListener('click', function (e) {
			e.preventDefault();
			this.parentNode.classList.toggle('active');
			this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
			e.stopImmediatePropagation();
		});
	});

	/**
	 * Preloader
	 */
	const preloader = document.querySelector('#preloader');
	if (preloader) {
		window.addEventListener('load', () => {
			preloader.remove();
		});
	}

	/**
	 * Scroll top button
	 */
	let scrollTop = document.querySelector('.scroll-top');

	function toggleScrollTop() {
		if (scrollTop) {
			window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
		}
	}
	scrollTop.addEventListener('click', (e) => {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	window.addEventListener('load', toggleScrollTop);
	document.addEventListener('scroll', toggleScrollTop);

	/**
	 * Animation on scroll (replaces AOS library)
	 */
	function aosInit() {
		const aosElements = document.querySelectorAll('[data-aos]');
		if (!aosElements.length) return;

		const aosObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const el = entry.target;
					const delay = parseInt(el.getAttribute('data-aos-delay')) || 0;
					setTimeout(() => {
						el.classList.add('aos-animate');
					}, delay);
					aosObserver.unobserve(el);
				}
			});
		}, { threshold: 0.1 });

		aosElements.forEach(el => {
			el.classList.add('aos-init');
			aosObserver.observe(el);
		});
	}
	aosInit();

	/**
	 * Counter animation (replaces PureCounter library)
	 */
	function initCounters() {
		const counters = document.querySelectorAll('.purecounter');
		if (!counters.length) return;

		const counterObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const el = entry.target;
					const end = parseInt(el.getAttribute('data-purecounter-end')) || 0;
					const duration = parseInt(el.getAttribute('data-purecounter-duration')) || 1;
					const startTime = performance.now();

					function updateCounter(currentTime) {
						const elapsed = (currentTime - startTime) / 1000;
						const progress = Math.min(elapsed / duration, 1);
						const eased = 1 - Math.pow(1 - progress, 3);
						el.textContent = Math.floor(eased * end);
						if (progress < 1) requestAnimationFrame(updateCounter);
					}
					requestAnimationFrame(updateCounter);
					counterObserver.unobserve(el);
				}
			});
		}, { threshold: 0.1 });

		counters.forEach(el => counterObserver.observe(el));
	}
	initCounters();

	/**
	 * Init swiper sliders
	 */
	function initSwiper() {
		document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
			let config = JSON.parse(
				swiperElement.querySelector(".swiper-config").innerHTML.trim()
			);

			if (swiperElement.classList.contains("swiper-tab")) {
				initSwiperWithCustomPagination(swiperElement, config);
			} else {
				new Swiper(swiperElement, config);
			}
		});
	}

	window.addEventListener("load", initSwiper);

	/**
	 * Correct scrolling position upon page load for URLs containing hash links.
	 */
	window.addEventListener('load', function (e) {
		if (window.location.hash) {
			if (document.querySelector(window.location.hash)) {
				setTimeout(() => {
					let section = document.querySelector(window.location.hash);
					let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
					window.scrollTo({
						top: section.offsetTop - parseInt(scrollMarginTop),
						behavior: 'smooth'
					});
				}, 100);
			}
		}
	});

	/**
	 * Navmenu Scrollspy
	 */
	let navmenulinks = document.querySelectorAll('.navmenu a');

	function navmenuScrollspy() {
		navmenulinks.forEach(navmenulink => {
			if (!navmenulink.hash) return;
			let section = document.getElementById(navmenulink.hash.slice(1));
			if (!section) return;
			let position = window.scrollY + 200;
			if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
				document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
				navmenulink.classList.add('active');
			} else {
				navmenulink.classList.remove('active');
			}
		})
	}
	window.addEventListener('load', navmenuScrollspy);
	document.addEventListener('scroll', navmenuScrollspy);

})();