//Обработчик событий отслеживает загрузку контента на странице
document.addEventListener('DOMContentLoaded', function () {
    const btnOpenModal = document.querySelector('#btnOpenModal')
    const modalBlock = document.querySelector('#modalBlock')
    const closeModal = document.querySelector('#closeModal')
    const questionTitle = document.querySelector('#question')
    const formAnswers = document.querySelector('#formAnswers')
    const nextButton = document.querySelector('#next')
    const prevButton = document.querySelector('#prev')
    const sendButton = document.querySelector('#send')

    //Массив объектов с вопросами и ответами
    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];



    //Открытие и закрытие модального окна
    btnOpenModal.addEventListener('click', function () {
        modalBlock.classList.add('d-block');
        playTest();
    })
    closeModal.addEventListener('click', function () {
        modalBlock.classList.remove('d-block');
    })


    //Основная функция тестирования, срабатывает при нажатии на кнопку
    const playTest = () => {

        //сюда заносятся все ответы
        const finalAnswers = []
        //переменная с номером вопроса
        let numberQuestion = 0;

        //Вывод ответов через цикл, каждый цикл создается див, куда заносится информация
        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
                    <label for="answerItem1" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                `;
                formAnswers.appendChild(answerItem);
            })
        }

        //Отрисовывает в модальное окно вопросы и ответы
        const renderQuestions = (indexQuestion) => {
            //Очищаем от предыдущего вызова функции
            formAnswers.innerHTML = '';

            if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                //рендер вопроса, подставляем из массива
                questionTitle.textContent = `${questions[indexQuestion].question}`;
                //запуск функции для рендеринга ответа
                renderAnswers(indexQuestion);

                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none')
                sendButton.classList.add('d-none');
            }

            if (numberQuestion === 0) {
                prevButton.classList.add('d-none');
            }
            // if (numberQuestion === questions.length - 1) {
            //     nextButton.classList.add('d-none');
            // }

            if (numberQuestion === questions.length) {
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none');
                formAnswers.innerHTML = `
                <div class="form-group">
                    <label for=""numberPhone">Enter your number</label>
                    <input type="password" class="form-control" id="numberPhone">
                </div>
                `;
            }

            //Страница спасибо и автоматическое закрытие окна
            if (numberQuestion === questions.length + 1) {
                formAnswers.textContent = 'Спасибо за пройденный тест';
                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                }, 2000)
            }

        }
        renderQuestions(numberQuestion);


        //Пакуем ответы в массив
        const checkAnswer = () => {
            console.log('check')
            const obj = {};

            const inputs = [formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone')
            inputs.forEach((input, index) => {
                if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = 'value'
                }
                if (numberQuestion === questions.length) {
                    obj['Номер телефона'] = input.value;
                }
            })
            finalAnswers.push(obj)

        }


        //Кнопки переключения вопросов
        nextButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        }
        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        }

        //Обработчик на кнопку отправки ответов
        sendButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        }
    }
})

