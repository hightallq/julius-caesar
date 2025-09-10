<script setup>
import './styles/Landing.css';
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
let currentLang = ref(locale.value);
let buttonText = computed(() => currentLang.value === 'en' ? 'UA' : 'EN');

const switchLang = () => {
    if (currentLang.value === 'en') {
        locale.value = 'ukr';
        currentLang.value = 'ukr';
    } else {
        locale.value = 'en';
        currentLang.value = 'en';
    }
}

let header = ref(null);

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    AOS.init();
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
})

function handleScroll() {
    if (header.value) {
        if (window.scrollY > 700) {
            header.value.classList.add('fixed');
        } else {
            header.value.classList.remove('fixed');
        }
    }
}

let isBurgerActive = ref(false);
let burger = ref(null);
let navLinks = ref(null);

function toggleBurger() {
    isBurgerActive.value = !isBurgerActive.value;
    burger.value = document.querySelector('.nav_burger');
    navLinks.value = document.querySelector('.nav_links');
    if (isBurgerActive.value) {
        navLinks.value.classList.add('show');
        burger.value.classList.add('show');
    } else {
        navLinks.value.classList.remove('show');
        burger.value.classList.remove('show');
    }
}

let questions = ref([false, false, false]);
function toggleQuestion(index) {
    questions.value[index] = !questions.value[index];
}

let modalStatus = ref(false);

let fullFeedback = computed(() => [{
    name: t('reviewsNames[0]'),
    feedback: t('reviewsFull[0]'),
    photo: 'https://st2.depositphotos.com/1782975/8649/i/950/depositphotos_86496924-stock-photo-young-man-smiling.jpg'
},
{
    name: t('reviewsNames[1]'),
    feedback: t('reviewsFull[1]'),
    photo: 'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg'
},
{
    name: t('reviewsNames[2]'),
    feedback: t('reviewsFull[2]'),
    photo: 'https://thumbs.dreamstime.com/b/black-business-man-thumb-up-happy-giving-modern-office-67668710.jpg'
},
{
    name: t('reviewsNames[3]'),
    feedback: t('reviewsFull[3]'),
    photo: 'https://thumbs.dreamstime.com/b/portrait-beautiful-authentic-southeast-asian-teenage-girl-side-profile-headshot-portrait-beautiful-authentic-southeast-asian-362845166.jpg'
}
])

let modalFeedback = ref({
    name: '',
    feedback: '',
    photo: ''
})

function showModal(index) {
    modalStatus.value = true
    modalFeedback.value = {
        name: fullFeedback.value[index].name,
        feedback: fullFeedback.value[index].feedback,
        photo: fullFeedback.value[index].photo
    }
}
function closeModal() {
    modalStatus.value = false
}

</script>

<template>
    <header ref="header">
        <nav>
            <div class="nav_name">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path fill="#d4b553"
                        d="M5.717 6.227c.99.377 1.14 1.033 1.14 5.597c0 4.565-.094 4.865-1.196 5.443c-.064.043-.09.103-.09.103c.06.142 1.149.176 3.63.176c3.45 0 3.84-.026 3.292-.326a2.1 2.1 0 0 1-.836-.81c-.313-.728-.257-8.541.026-9.326c.261-.63.223-.655 1.294-.557c2.327.279 3.373 1.565 3.373 4.239c0 1.864-.472 2.923-1.646 3.831c-.574.429-.814.883-.943 1.792l-.175 1.183h5.271v-1.436c0-1.389-.026-1.414-.42-.883c-.339.48-.626.557-2.087.557c-1.672 0-2.22-.33-1.046-.608c.943-.228 2.272-1.385 2.666-2.345c.548-1.234.471-3.325-.184-4.337C16.427 6.377 15.236 5.974 9.62 6c-2.773 0-4.273.077-3.904.227m3.981.656c.078.227.159 2.473.159 5.014c0 3.686-.081 4.667-.369 4.895c-.728.578-1.08-.532-1.08-5.015c0-4.037.322-5.297.9-5.297c.129 0 .313.176.386.403z" />
                </svg>
                <h1>Julius Caesar</h1>
            </div>
            <ul class="nav_links" :class="{ show: isBurgerActive }">
                <li><a @click="toggleBurger" href="#about">{{ $t('nav[0]') }}</a></li>
                <li><a @click="toggleBurger" href="#benefits">{{ $t('nav[1]') }}</a></li>
                <li><a @click="toggleBurger" href="#projects">{{ $t('nav[2]') }}</a></li>
                <li><a @click="toggleBurger" href="#questions">{{ $t('nav[3]') }}</a></li>
                <li><a @click="toggleBurger" href="#feedback">{{ $t('nav[4]') }}</a></li>
                <li><a @click="toggleBurger" href="#contact">{{ $t('nav[5]') }}</a></li>
            </ul>
            <div class="nav_translate">
                <button @click="switchLang()">{{ buttonText }}</button>
            </div>
            <div class="nav_burger" @click="toggleBurger" :class="{ show: isBurgerActive }">
                <span></span><span></span><span></span>
            </div>
        </nav>
    </header>

    <main>
        <section id="about">
            <div class="about_bg" data-aos="fade-right">
                <img src="/src/img/julius-caesar.webp"
                    alt="">
            </div>
            <div class="about_txt">
                <h2>{{ $t('about[0]') }}</h2>
                <p>{{ $t('about[1]') }}</p>
                <p>{{ $t('about[2]') }}</p>
                <button>{{ $t('about[3]') }} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q3.65 0 6.388 2.288t3.412 5.737h-2.05q-.475-1.825-1.713-3.263T15 4.6V5q0 .825-.588 1.413T13 7h-2v2q0 .425-.288.713T10 10H8v2h2v3H9l-4.8-4.8q-.075.45-.138.9T4 12q0 3.275 2.3 5.625T12 20v2Zm9.1-.5l-3.2-3.2q-.525.3-1.125.5T15.5 19q-1.875 0-3.187-1.313T11 14.5q0-1.875 1.313-3.188T15.5 10q1.875 0 3.188 1.313T20 14.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2l-1.4 1.4ZM15.5 17q1.05 0 1.775-.725T18 14.5q0-1.05-.725-1.775T15.5 12q-1.05 0-1.775.725T13 14.5q0 1.05.725 1.775T15.5 17Z" />
                    </svg></button>
            </div>
        </section>
        <section id="benefits">
            <div class="benefits_txt">
                <h2>{{ $t('benefits[0]') }}</h2>
                <p>{{ $t('benefits[1]') }}</p>
            </div>
            <div class="benefits_cards">
                <div class="card" data-aos="zoom-in">
                    <div class="card_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
                            <path fill="#a00807"
                                d="M5 5a5 5 0 0 1 10 0v2A5 5 0 0 1 5 7V5zM0 16.68A19.9 19.9 0 0 1 10 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z" />
                        </svg>
                    </div>
                    <h3>{{ $t('benefitsList[0]') }}</h3>
                    <p>{{ $t('benefitsText[0]') }}</p>
                </div>
                <div class="card" data-aos="zoom-in">
                    <div class="card_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 432 408">
                            <path fill="#d4b553"
                                d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                        </svg>
                    </div>
                    <h3>{{ $t('benefitsList[1]') }}</h3>
                    <p>{{ $t('benefitsText[1]') }}</p>
                </div>
                <div class="card" data-aos="zoom-in">
                    <div class="card_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 640 512">
                            <path fill="#a00807"
                                d="M144 0a80 80 0 1 1 0 160a80 80 0 1 1 0-160zm368 0a80 80 0 1 1 0 160a80 80 0 1 1 0-160zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96H21.3C9.6 320 0 310.4 0 298.7zM405.3 320h-.7c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7c58.9 0 106.7 47.8 106.7 106.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0a96 96 0 1 1-192 0zm-96 261.3c0-73.6 59.7-133.3 133.3-133.3h117.4c73.6 0 133.3 59.7 133.3 133.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                        </svg>
                    </div>
                    <h3>{{ $t('benefitsList[2]') }}</h3>
                    <p>{{ $t('benefitsText[2]') }}</p>
                </div>
                <div class="card" data-aos="zoom-in">
                    <div class="card_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <g fill="none" stroke="#d4b553" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2">
                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
                                <path
                                    d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1-1.8-1M12 7v10" />
                            </g>
                        </svg>
                    </div>
                    <h3>{{ $t('benefitsList[3]') }}</h3>
                    <p>{{ $t('benefitsText[3]') }}</p>
                </div>
            </div>

        </section>
        <section id="projects">
            <div class="projects_txt">
                <h2>{{ $t('projects[0]') }}</h2>
                <p>{{ $t('projects[1]') }}</p>
            </div>
            <Swiper :modules="[Navigation, Pagination]" :slides-per-view="1" navigation pagination class="my-swiper">
                <SwiperSlide class="swiper-slide">
                    <div class="bg-slide">
                        <img src="/src/img/Cole_Thomas_The_Course_of_Empire_Destruction_1836.webp"
                            alt="Slide 1" />
                        <h2>{{ $t('projectsSlides[0]') }}</h2>
                        <button class="project_button">{{ $t('projectsSlides[3]') }}</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide class="swiper-slide">
                    <div class="bg-slide">
                        <img src="/src/img/claudelorraincapriccioruinsforum.webp"
                            alt="Slide 2" />
                        <h2>{{ $t('projectsSlides[1]') }}</h2>
                        <button class="project_button">{{ $t('projectsSlides[3]') }}</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide class="swiper-slide">
                    <div class="bg-slide">
                        <img src="/src/img/Cole_Thomas_The_Consummation_The_Course_of_the_Empire_1836.webp"
                            alt="Slide 3" />
                        <h2>{{ $t('projectsSlides[2]') }}</h2>
                        <button class="project_button">{{ $t('projectsSlides[3]') }}</button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
        <section id="questions">
            <div class="questions_intro">
                <h2>{{ $t('questions[0]') }}</h2>
                <p>{{ $t('questions[1]') }}</p>
            </div>

            <div class="questions_blocks" data-aos="fade-down">
                <div class="question_block" :class="{ active: questions[0] }" @click="toggleQuestion(0)">
                    <div class="question_header">
                        <h3>{{ $t('questionsList[0]') }}</h3>
                        <span class="arrow_down" :class="{ active: questions[0] }">▼</span>
                    </div>
                    <div class="question_answer" :class="{ active: questions[0] }">
                        <p>{{ $t('questionAnswers[0]') }}</p>
                    </div>
                </div>
                <div class="question_block" :class="{ active: questions[1] }" @click="toggleQuestion(1)">
                    <div class="question_header">
                        <h3>{{ $t('questionsList[1]') }}</h3>
                        <span class="arrow_down" :class="{ active: questions[1] }">▼</span>
                    </div>
                    <div class="question_answer" :class="{ active: questions[1] }">
                        <p>{{ $t('questionAnswers[1]') }}</p>
                    </div>
                </div>
                <div class="question_block" :class="{ active: questions[2] }" @click="toggleQuestion(2)">
                    <div class="question_header">
                        <h3>{{ $t('questionsList[2]') }}</h3>
                        <span class="arrow_down" :class="{ active: questions[2] }">▼</span>
                    </div>
                    <div class="question_answer" :class="{ active: questions[2] }">
                        <p>{{ $t('questionAnswers[2]') }}</p>
                    </div>
                </div>
            </div>
        </section>
        <section id="feedback">
            <div class="feedback_txt">
                <h2>{{ $t('reviews[0]') }}</h2>
                <p>{{ $t('reviews[1]') }}</p>
            </div>
            <Swiper :modules="[Autoplay]" :slides-per-view="2" :space-between="16" :slides-per-group="2" :loop="true" :autoplay="{ delay: 3000, disableOnInteraction: false, }" class="feedback_slideshow" :breakpoints="{
                0: {
                    slidesPerView: 1,
                    slidesPerGroup: 1
                },
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 2
                }
            }">
                <SwiperSlide class="feedback_slide">
                    <div class="feedback_clientinfo">
                        <div class="feedback_logo">
                            <img :src='fullFeedback[0].photo' alt='' />
                        </div>
                        <h3>{{ fullFeedback[0].name }}</h3>
                    </div>
                    <div class="feedback_description">
                        <div class="feedback_rating">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                        </div>
                        <p>{{ $t('reviewsPreviews[0]') }}</p>
                        <button class="feedback_button" @click="showModal(0)">{{ $t('reviews[2]') }}</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide class="feedback_slide">
                    <div class="feedback_clientinfo">
                        <div class="feedback_logo">
                            <img :src='fullFeedback[1].photo' alt='' />
                        </div>
                        <div class="feedback_username">
                            <h3>{{ fullFeedback[1].name }}</h3>
                        </div>
                    </div>
                    <div class="feedback_description">
                        <div class="feedback_rating">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                        </div>
                        <p>{{ $t('reviewsPreviews[1]') }}</p>
                        <button class="feedback_button" @click="showModal(1)">{{ $t('reviews[2]') }}</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide class="feedback_slide">
                    <div class="feedback_clientinfo">
                        <div class="feedback_logo">
                            <img :src='fullFeedback[2].photo' alt='' />
                        </div>
                        <div class="feedback_username">
                            <h3>{{ fullFeedback[2].name }}</h3>
                        </div>
                    </div>
                    <div class="feedback_description">
                        <div class="feedback_rating">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                        </div>
                        <p>{{ $t('reviewsPreviews[2]') }}</p>
                        <button class="feedback_button" @click="showModal(2)">{{ $t('reviews[2]') }}</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide class="feedback_slide">
                    <div class="feedback_clientinfo">
                        <div class="feedback_logo">
                            <img :src='fullFeedback[3].photo' alt='' />
                        </div>
                        <div class="feedback_username">
                            <h3>{{ fullFeedback[3].name }}</h3>
                        </div>
                    </div>
                    <div class="feedback_description">
                        <div class="feedback_rating">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                        </div>
                        <p>{{ $t('reviewsPreviews[3]') }}</p>
                        <button class="feedback_button" @click="showModal(3)">{{ $t('reviews[2]') }}</button>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div v-if="modalStatus" class="modal-overlay">
                <div class="modal-window">
                    <button class="modal-close" @click="closeModal()">&times;</button>
                    <div class="feedback_clientinfo">
                        <div class="feedback_logo">
                            <img :src='modalFeedback.photo' alt='' />
                        </div>
                        <div class="feedback_username">
                            <h3>{{ modalFeedback.name }}</h3>
                        </div>
                    </div>
                    <div class="feedback_description">
                        <div class="feedback_rating">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 408">
                                <path fill="#d4b553"
                                    d="M213 328L81 408l35-150L0 157l153-13L213 3l60 141l154 13l-117 101l35 150z" />
                            </svg>
                        </div>
                        <p>{{ modalFeedback.feedback }}</p>
                    </div>
                </div>
            </div>
        </section>
        <section id="contact">
            <div class="contact_txt">
                <h2>{{ $t('contact[0]') }}</h2>
                <p>{{ $t('contact[1]') }}</p>
            </div>
            <div class="contact_form" data-aos="zoom-in">
                <form action="https://formspree.io/f/mvgqwroa" method="POST">
                    <div class="form_box">
                        <label for="name">{{ $t('contact[2]') }}</label>
                        <input type="text" id="name" name="name" required>
                    </div>

                    <div class="form_box">
                        <label for="email">{{ $t('contact[3]') }}</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form_box">
                        <label for="message">{{ $t('contact[4]') }}</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>

                    <button type="submit">{{ $t('contact[5]') }}</button>
                </form>
            </div>
        </section>
    </main>

    <footer>
        <div class="copyrights">
            <p>&copy; 2025 My Portfolio. All rights reserved.</p>
        </div>
        <div class="media">
            <div>
                <a href="#">
                    <!-- Facebook -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 224 432">
                        <path fill="#fff"
                            d="M145 429H66V235H0v-76h66v-56q0-48 27-74t72-26q36 0 59 3v67l-41 1q-22 0-30 9t-8 27v49h76l-10 76h-66v194z" />
                    </svg>
                </a>
            </div>
            <div>
                <a href="#">
                    <!-- Twitter -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#fff"
                            d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                </a>
            </div>
            <div>
                <a href="#">
                    <!-- LinkedIn -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 432">
                        <path fill="#fff"
                            d="M319 221.5q-8-10.5-30-10.5q-27 0-38 16t-11 45v146q0 5-3 8t-8 3h-76q-4 0-7.5-3t-3.5-8V148q0-4 3.5-7.5t7.5-3.5h74q4 0 6.5 2t3.5 6v5q1 2 1 7q28-27 76-27q53 0 83 27t30 79v182q0 5-3.5 8t-7.5 3h-78q-4 0-7.5-3t-3.5-8V254q0-22-8-32.5zM88 91.5Q73 107 51.5 107T15 91.5t-15-37T15 18T51.5 3T88 18t15 36.5t-15 37zm13 56.5v270q0 5-3.5 8t-7.5 3H14q-5 0-8-3t-3-8V148q0-4 3-7.5t8-3.5h76q4 0 7.5 3.5t3.5 7.5z" />
                    </svg>
                </a>
            </div>
        </div>
    </footer>
</template>

<style scoped>
@import './styles/Landing.css';
</style>