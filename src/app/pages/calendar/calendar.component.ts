import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {DateRange, MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {IEvents} from "../../interfaces/events";
import {DialogUsuarioComponent} from "../../shared/diolog_components/dialog-usuario/dialog-usuario.component";
import {MatDialog} from "@angular/material/dialog";
import {EventsService} from "../../service/events.service";
import {IUser} from "../../interfaces/user";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {DialogEventsComponent} from "../../shared/diolog_components/dialog-events/dialog-events.component";

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  title = 'scheduler';
  isEvent!: boolean;
  dragDisabled = true;
  eventControl = new FormControl();
  sampleRange!: DateRange<Date>;
  tbSourceEvents$ = new MatTableDataSource<IEvents>();
  @ViewChild('table', { static: true }) table!: MatTable<IEvents>;
 // @ViewChild(MatTable) tableEvent!: MatTable<any>;
  dialogUser!: DialogUsuarioComponent;
  selected = new Date() ;
  dateFormat =new Intl.DateTimeFormat("en-US", { }).format(this.selected);
  resultDate: any;
  dateCard = new FormControl();

  lotsOfTabs = new Array(30).fill(0).map((_, index) => `Day ${index+1}`);
 // displayedColumns: string[] = ['id_event', 'title','participant', 'data_day' , 'begin', 'description', ' finished' ];
    displayedColumns: string[] = ['begin','participant','data_day','finished', 'edit','remove'];

    hourly = [
    '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', "6 AM",
    '7 AM','8 AM', '9 AM', '10 AM', '11 AM', '12 AM',
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', "6 PM",
    '7 PM','8 PM', '9 PM', '10 PM', '11 PM', '12 PM'
  ];


  constructor(
           public dialog: MatDialog,
              private eventService: EventsService
  ) {
   //   this.listEvents();
    this.refreshDR();
  }
  ngOnInit() {
  }

  /*

  import { FormBuilder, FormGroup, Validators } from '@angular/forms';

    identificacaoForm: FormGroup;
    ngOnInit() {
      this.fb = this.getService<FormBuilder>(FormBuilder);
      this.identificacaoForm = this.fb.group({
        dataNascimento: this.fb.control('', [Validators.required])
      })};

      consultarDados() {
        if (this.formulario.valid) {
          const consulta: any = {};
          this.identificacaoForm.get('date_day')
            .setValue(this.datePipe.transform(this.formulario.get('date_day').value.toString(), 'dd/MM/yyyy'));
        }
      };
  */

 listEvents(){
      this.eventService.getAllEvents().subscribe(
        (result: IEvents[]) => {
            console.log(result);
          this.tbSourceEvents$.data = result;
        });
    }

  getDay(){
    let day = this.selected.getDate().toString();
    let options = {};
    let restDate =new Intl.DateTimeFormat("en-US", { }).format(this.selected);
   // let m = new Date();
    //let month =  m.setDate(this.selected.getDate() +1) ;
   // v.setDate(month.getDate() -3);
    let year = this.selected.getUTCFullYear().toString();
    let month = this.selected.getMonth().toString();
   // let datalocal = this.selected.toLocaleDateString().replaceAll('/','-');
    var datalocal = this.selected.toLocaleDateString().split('/').reverse();
   // let dt_rev:string = datalocal[];
      var date_rev = new Array;
      for (var i = restDate.length - 1; i >= 0; i--) {
        date_rev.push(restDate.split('/').reverse()[i]);
      }
    let data_brasileira = this.selected.toLocaleDateString();
    let data_usa = data_brasileira.split('/').reverse().join('-');
    // day = day.length === 1 ? `0${day}` : day;
  //  month = month.length === 1 ? `0${month}` : month;
  //  let formatted = this.selected.innerText;
    // options = { hour: "numeric", dayPeriod: "short" };
    //options.fractionalSecondDigits = 3;
    // this.resultDate =new Intl.DateTimeFormat("en-US", options).format(this.selected);
    // this.resultDate = this.selected.toLocaleDateString('pt-BR', options );
  //  this.listEventByDataDay(restDate.replaceAll('/','-').replace('','0'));
    //this.listEventByDataDay(`${year}-${month}-${day}`);


    let dataFormatada = (this.selected.getFullYear() + "-" + ((this.selected.getMonth() + 1)) + "-" + (this.selected.getDate() )) ;

    this.listEventByDataDay(data_usa);
   // this.listEventByDataDay(`${month}`);
    this.resultDate = `${day}`;
  }

    listEventByDataDay(dt_day:any){
  //  alert(dt_day);
  /*  this.eventService.getEventByDataDay(dt_day).subscribe(
        (result: IEvents[]) => {
          this.tbSourceEvents$.data = result;
        });*/
      this.eventService.getAllEvents().subscribe(
        (result: IEvents[]) => {
          this.tbSourceEvents$.data = result;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.tbSourceEvents$.filter = filterValue.trim().toLowerCase();
        if (this.tbSourceEvents$.paginator) {
            this.tbSourceEvents$.paginator.firstPage();
        }
    }

  chosenYearHandler(normalizedYear: Date) {
    const ctrlValue = this.dateCard.value;
    ctrlValue.year(normalizedYear.getFullYear());
    this.dateCard.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Date) {
    const ctrlValue = this.dateCard.value;
    ctrlValue.month(normalizedMonth.getMonth());
    this.dateCard.setValue(ctrlValue);
  }

  openSearchUser(user: IUser){
    this.dialogUser.openDialogoUsers(user);
  }

  refreshDR() {
    this.sampleRange = new DateRange((() => {
      let v = new Date();
      v.setDate(v.getDate() -3);
      return v;
    })(), new Date());
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const date = cellDate.getDate();
    if (view == 'month') {
      return (date == 1) ? 'highlight-date' : "";
    }
    return "";
  }

  flagEvent(){
    if ('this.ievent.id_event' != null) {
      this.isEvent = true;
    } else {
      this.isEvent = false;
    }
  }

    dropTable(event: CdkDragDrop<any>) {
    // Return the drag container to disabled.
    this.dragDisabled = true;
    const previousIndex = this.hourly.findIndex((d) => d === event.item.data);
    moveItemInArray(this.hourly, event.previousIndex, event.currentIndex);
    this.table.renderRows();
  }

  openDialogo(schedule: IEvents) {
    const dialogRef = this.dialog.open(DialogEventsComponent, {
      width: '300px',
      data: schedule === null ? {
        id_event: null,
        title:'',
        participant: '',
        data_day:'',
        description: '',
        begin: '',
        finish: ''
      } : {
        id_event: schedule.id_event,
        title: schedule.title,
        participant: schedule.participant,
        data_day: schedule.data_day,
        description: schedule.description,
        begin: schedule.begin,
        finish: schedule.finished
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if (this.tbSourceEvents$.data
          .map(p => p.id_event).includes(result.id)) {
          this.eventService.editEvent(result)
            .subscribe((data: IEvents) => {
              const index = this.tbSourceEvents$.data
                .findIndex(p => p.id_event === data.id_event);
              this.tbSourceEvents$.data[index] = data;
              this.table.renderRows();
            });
        } else {
          this.eventService.createEvent(result)
            .subscribe((data: IEvents) => {
              this.tbSourceEvents$.data.push(result);
              this.table.renderRows();
            });
        }}});
  }

    editEvent(event: IEvents){
        this.openDialogo(event);
    }


    deleteEvent(id: number) {
        if(confirm('Are you sure to delete this event?')) {
            this.eventService.deleteEvent(id)
                .subscribe((data: IEvents) => {
                    this.tbSourceEvents$.data.pop();
                    this.table.renderRows();
                });
        }
    }


}
