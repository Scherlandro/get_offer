import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  products = [
    {
      id: 1,
      name: 'Produto 1',
      description: 'Descrição do Produto 1',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Produto 2',
      description: 'Descrição do Produto 2',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Produto 3',
      description: 'Descrição do Produto 3',
      image: 'https://via.placeholder.com/150'
    }
  ];

  selectedProduct: any = null;

  selectProduct(product: any) {
    this.selectedProduct = product;
  }







 /* title = 'scheduler';
  eventControl = new FormControl();
  sampleRange!: DateRange<Date>;
  tbSourceEvents$ = new MatTableDataSource<IEvents>();
  @ViewChild('table', { static: true }) table!: MatTable<IEvents>;
  @ViewChild(MatTable) tableEvent!: MatTable<any>;
  dialogUser!: DialogUsuarioComponent;
  selected!: Date ;
  resultDate: any;
  dateCard = new FormControl();

  lotsOfTabs = new Array(30).fill(0).map((_, index) => `Day ${index+1}`);
  displayedColumns: string[] = ['id_event'];
  hourly = [
    '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', "6 AM",
    '7 AM','8 AM', '9 AM', '10 AM', '11 AM', '12 AM',
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', "6 PM",
    '7 PM','8 PM', '9 PM', '10 PM', '11 PM', '12 PM'
  ];

  dragDisabled = true;


  constructor(public dialog: MatDialog,
              private eventService: EventsService
  ) {
    this.refreshDR();
  }

  ngOnInit(){
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

  getDay(){
    let day = this.selected.getDate().toString();
   //  day = day.length === 1 ? `0${day}` : day;
   // options = { hour: "numeric", dayPeriod: "short" };
    //options.fractionalSecondDigits = 3;
  //  this.resultDate =new Intl.DateTimeFormat("en-US", options).format(this.selected);
    // this.resultDate = this.selected.toLocaleDateString('pt-BR', options );
    this.resultDate = `${day}`;
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
        description: '',
        begin: '',
        finish: ''
      } : {
        id_event: schedule.id_event,
        description: schedule.description,
        begin: schedule.begin,
        finish: schedule.finish
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
              this.tableEvent.renderRows();
            });
        } else {
          this.eventService.createEvent(result)
            .subscribe((data: IEvents) => {
              this.tbSourceEvents$.data.push(result);
              this.tableEvent.renderRows();
            });
        }}});
  }
*/

}
