import{select, templates,settings} from '../settings.js'
import AmountWidget from '../components/AmountWidget.js';
import DatePicker from '../components/DatePicker.js';
import HourPicker from '../components/HourPicker.js';
import utils from '../utils.js'

class Booking{
    constructor(element){
        const thisBooking=this;

        thisBooking.render(element);
        thisBooking.initWidget();
        thisBooking.getData();
    }
 
    getData(){
        const thisBooking=this;
        const startDateParam=settings.db.dateStartParamKey+'='+ utils.dateToStr(thisBooking.datePicker.minDate);
        const endDateParam=settings.db.dateEndParamKey+'='+ utils.dateToStr(thisBooking.datePicker.maxDate);

        const params={
            booking:[
                startDateParam,
                endDateParam,
            ],
            eventsCurrent:[
                settings.db.notRepeatParam,
                startDateParam,
                endDateParam,
            ],
            eventsRepeat:[
                settings.db.repeatParam,
                endDateParam,
            ],
        };
        console.log('getData params', params);

        const urls={
            booking:       settings.db.url +'/'+ settings.db.bookings
                                           +'?'+ params.booking.join('&'),
            eventsCurrent: settings.db.url +'/'+ settings.db.events
                                           +'?'+ params.eventsCurrent.join('&'),
            eventsRepeat:  settings.db.url +'/'+ settings.db.events   
                                           +'?'+ params.eventsRepeat.join('&'),
        };
        console.log('getData urls',urls);
    }

    render(element){
        const thisBooking=this;
        thisBooking.dom={};
        thisBooking.dom.wrapper=element;
        
        
        const generatedHTML = templates.bookingWidget();
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        
        thisBooking.dom.wrapper.appendChild(generatedDOM);
        
        thisBooking.dom.peopleAmount=thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
        thisBooking.dom.hoursAmount=thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
        thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
        thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
    }
    initWidget(){
        const thisBooking=this;
        thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
        thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
        thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
        thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);


        thisBooking.dom.wrapper.addEventListener('updated', function(){
            thisBooking.updateDOM();
        });

        thisBooking.dom.allTables.addEventListener('click', function(event){
            thisBooking.initTables(event);
        });

        thisBooking.dom.wrapper.addEventListener('updated', function(){
            thisBooking.resetTables();
        });



    }

}
export default Booking;
