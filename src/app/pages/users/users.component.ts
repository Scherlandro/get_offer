
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/service/user.service';
import { DialogUsuarioComponent } from 'src/app/shared/diolog_components/dialog-usuario/dialog-usuario.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

const EMAILS: string[] = [
  'maia@bmail.com',  'asher@gmail.com',  'olivia@hotmail.com',  'atticus@yahoo.com', 'amelia@dtmail.com',  'jack@gmail.com',
  'charlotte@bmail.com', 'theodore@hotmail.com', 'isla@yahoo.com', 'oliver@gmail.com', 'Isabella@bmail.com', 'jasper@yahoo.com',
  'cora@hotmail.com',  'levi@gmail.com',  'violet@bmail.com',  'arthur@yahoo.com',  'thomas@gmail.com',  'elizabeth@yahoo.com',
];
const NAMES: string[] = [
  'Maia',  'Asher',  'Olivia',  'Atticus',  'Amelia',  'Jack',  'Charlotte',  'Theodore',  'Isla',  'Oliver',  'Isabella',
  'Jasper',  'Cora',  'Levi',  'Violet',  'Arthur',  'Mia',  'Thomas',  'Elizabeth', ];

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements AfterViewInit{
  /*displayedColumns0: string[] = ['id_user'];
  dataSource0!: MatTableDataSource<UserData>;*/

  displayedColumns: string[] = ['id', 'name', 'email', 'password','edite','delete'];
  dataSource = new MatTableDataSource<IUser>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(MatTable) tableUser!: MatTable<any>;
    userControl = new FormControl();
     filterUsers: IUser[]=[];


    constructor(public dialog: MatDialog,
                private userService: UserService
                ) {
  /*   const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);*/
      this.listUsers();
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

    onMatSortChange(){
      this.dataSource.sort = this.sort;
    }

    listUsers(){
      this.userService.getAllUsers().subscribe(
        (result: IUser[]) => {
          this.dataSource.data = result;
        });
    }

  applyFilters(val:string){
      val = val.trim().toLowerCase();
      this.dataSource.filter = val;
    }

    openDialogo(eventUser: IUser) {
      const dialogRef = this.dialog.open(DialogUsuarioComponent, {
        width: '300px',
        data: eventUser === null ? {
          id: null,
          name: '',
          username: '',
          password: ''
        } : {
          id: eventUser.id,
          name: eventUser.name,
          username: eventUser.username,
          password: eventUser.password
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined){
          if (this.dataSource.data
            .map(p => p.id).includes(result.id)) {
            this.userService.editUser(result)
              .subscribe((data: IUser) => {
                const index = this.dataSource.data
                  .findIndex(p => p.id === data.id);
                this.dataSource.data[index] = data;
                this.tableUser.renderRows();
              });
          } else {
            this.userService.createUser(result)
              .subscribe((data: IUser) => {
                this.dataSource.data.push(result);
                this.tableUser.renderRows();
              });
          }}});
    }

    editElement(eventUser: IUser){
      this.openDialogo(eventUser);
    }

    deleteElement(id: number) {
      if(confirm('Are you sure to delete this user?')) {
        this.userService.deleteUser(id)
          .subscribe((data: IUser) => {
            this.dataSource.data.pop();
            this.tableUser.renderRows();
          });
      }
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
/*
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';
  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: EMAILS[Math.round(Math.random() * (EMAILS.length - 1))],
  };
  }
*/












