import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatDialog} from "@angular/material/dialog";
import {IUser} from "../../../interfaces/user";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.css']
})
export class DialogUsuarioComponent implements OnInit {
  element!: IUser;
  isChange!: boolean;
  tbSourceEvents$ = new MatTableDataSource<IUser>();
  @ViewChild(MatTable) tableUser!: MatTable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public iUser: IUser,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    private userService: UserService
  ) {}


  ngOnInit(): void {
    if (this.iUser.id != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }


 public openDialogoUsers(user: IUser) {

    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
       data: user === null ? {
        id_event: null,
        description: '',
        begin: '',
        finish: ''
      } : {
        id_event: user.id,
        description: user.name,
        begin: user.username,
        finish: user.password
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if (this.tbSourceEvents$.data
          .map(p => p.id).includes(result.id)) {
          this.userService.editUser(result)
            .subscribe((data: IUser) => {
              const index = this.tbSourceEvents$.data
                .findIndex(p => p.id === data.id);
              this.tbSourceEvents$.data[index] = data;
              this.tableUser.renderRows();
            });
        } else {
          this.userService.createUser(result)
            .subscribe((data: IUser) => {
              this.tbSourceEvents$.data.push(result);
              this.tableUser.renderRows();
            });
        }}});
  }




}
