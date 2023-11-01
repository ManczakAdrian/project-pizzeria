import{select, templates} from '../settings.js'
import AmountWidget from '../components/AmountWidget.js';
import utils from '../utils.js'

class Booking{
    constructor(element){
        const thisBooking=this;

        thisBooking.render(element);
        thisBooking.initWidget();
        thisBooking.getData();
    }
    render(element){
        const thisBooking=this;
        thisBooking.dom={};
        thisBooking.dom.wrapper=element;
        
        thisBooking.dom.wrapper.appendChild(generatedDOM);
        const generatedHTML = templates.bookingWidget();

        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
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
