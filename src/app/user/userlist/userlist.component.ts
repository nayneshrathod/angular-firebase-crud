import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/users.service';
import { Users } from 'src/app/users.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users: Users[];
  constructor(private userService: UsersService) { }

  MyForm = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Mobile: new FormControl('', Validators.required),
    Username: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Users;
      })
    });
  }

  create(user: Users) {
    this.userService.createUser(user);
    this.rest();
  }

  update(user: Users) {
    this.userService.updateUser(user);
  }

  delete(id: string) {
    this.userService.deleteUser(id);
  }

  rest() {
    this.MyForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      Mobile: new FormControl('', Validators.required),
      Username: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
    });
  }
}
