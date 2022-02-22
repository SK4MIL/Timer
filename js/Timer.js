export default class Timer {
    constructor(root){
        root.innerHTML = Timer.getHTML();

        this.interval = null;
        this.remainingSeconds = 0;

        this.el ={
            hours: root.querySelector(".timer_part_hours"),
            minutes: root.querySelector(".timer_part_minutes"),
            seconds: root.querySelector(".timer_part_seconds"),
            control: root.querySelector(".timer_btn_control"),
            reset: root.querySelector(".timer_btn_reset")
        };

        this.updateInterfaceTime();
        this.updateInterfaceContols();
        this.start();
        this.el.control.addEventListener("click", () =>{
            if (this.interval === null) {
                this.start();
            }
            else{
                this.stop();
            }
        });
        this.el.reset.addEventListener("click", () =>{
            const inputMinutes = prompt("Enter number of minutes:");

            if (inputMinutes <= 60*24) {
                this.stop();
                this.remainingSeconds = inputMinutes*60;
                this.updateInterfaceTime();
            }
        });
    }

    updateInterfaceTime () {
       let hours = Math.floor(this.remainingSeconds/ (60*60))%24;
       let minutes = Math.floor(this.remainingSeconds / 60)%60;
       let seconds = this.remainingSeconds % 60;
       
       this.el.hours.textContent=hours.toString().padStart(2,"0");
       this.el.minutes.textContent = minutes.toString().padStart(2, "0");
       this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceContols(){
        if(this.interval == null){
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer_btn_start");
            this.el.control.classList.remove("timer_btn_stop");
        }
        else{
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer_btn_stop");
            this.el.control.classList.remove("timer_btn_start");
        }
    }

    start(){
        if( this.remainingSeconds === 0) return;
        this.interval=setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();   
        
            if (this.remainingSeconds === 0) {
                this.stop();
                this.nottify();
                alert("Koniec czasu");
            }
        }, 1000);

        this.updateInterfaceContols(); 
    }

    stop(){
        clearInterval(this.interval);
        
        this.interval=null;
        this.updateInterfaceContols();
    }

    nottify(ev){
        const audio = new Audio("../media/alert.wav")
       // audio.src = "../media/alert.wav";
        audio.removeAttribute('controls');
        audio.play();
    }
    
    static getHTML() {
        return `
        <span class="timer_part timer_part_hours">00</span>
        <span class="timer_part ">:</span>
        <span class="timer_part timer_part_minutes">00</span>
        <span class="timer_part ">:</span>
        <span class="timer_part timer_part_seconds">00</span>
        <br/>
        <button type="button" class="timer_btn timer_btn_control timer_btn_start">
            <span class="material-icons">play_arrow</span>
        </button>
        <button type="button" class="timer_btn timer_btn_reset">
            <span class="material-icons">timer</span>
        </button>
        `;
    }

}