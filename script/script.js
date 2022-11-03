document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer = document.getElementById('customer');
    const freelancer = document.getElementById('freelancer');
    const blockCustomer = document.getElementById('block-customer');
    const blockFreelancer = document.getElementById('block-freelancer');
    const blockChoice = document.getElementById('block-choice');
    const btnExit = document.getElementById('btn-exit');
    const formCustomer = document.getElementById('form-customer');
    const ordersTable = document.getElementById('orders');
    const modalOrder = document.getElementById('order_read');
    const modalOrderActive = document.getElementById('order_active');

    const orders = [];


    const renderOrders = () => {

        ordersTable.textContent = '';

        orders.forEach((order, i) => {
       
            ordersTable.innerHTML += `
                <tr class="order" data-number-order="${i}">
                    <td>${i+1}</td>
                    <td>${order.title}2</td>
                    <td class = "${order.currency}"></td>
                    <td>${order.deadline}</td>
                </tr>`;
        });   
    };

            const openModal = (numberOrder) => {
            const order = orders[numberOrder];
            const modal = order.active ? modalOrderActive : modalOrder;

            const firstNameBlock = document.querySelector('.firstName'),
                  titleBlock = document.querySelector('.modal-title'),
                  emailBlock = document.querySelector('.email'),
                  descriptionBlock = document.querySelector('.description'),
                  deadLineBlock = document.querySelector('.deadline'),
                  currencyBlock = document.querySelector('.currency-img'),
                  countBlock = document.querySelector('.count'),
                  phoneBlock = document.querySelector('.phone');

                  titleBlock.textContent = order.title;
                  firstNameBlock.textContent = order.firstName;

            modal.style.display = 'block';
            };

            ordersTable.addEventListener('click', event => {
             const target = event.target;

        const targetOrder = target.closest('.order')
        if (targetOrder){
            openModal(targetOrder.dataset.numberOrder);
        }
    })

    customer.addEventListener('click', () => {
        blockCustomer.style.display = 'block';
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';

    });
    freelancer.addEventListener('click', () => {
        blockFreelancer.style.display = 'block';
        renderOrders();
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', () => {
        blockFreelancer.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockChoice.style.display = 'block';
        btnExit.style.display = 'none';
    });

    formCustomer.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(event);

        const obj = {};

        for (const elem of formCustomer.elements){
            if ((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
            (elem.type === 'radio' && elem.checked) ||
            (elem.tagName === 'TEXTAREA')){
            obj[elem.name] = elem.value;

            if (elem.type !== 'radio'){
                elem.value = '';
            }
            }
        }
        formCustomer.reset();
        orders.push(obj);
    });

    

});