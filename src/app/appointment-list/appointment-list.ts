import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css'
})
export class AppointmentList {
  newAppointmentID: number = 1;
  newAppointmentDescription: string = '';
  newAppointmentDate: Date = new Date();
 appointments: Appointment[] = []

 addAppointment(){
  if(this.newAppointmentDescription.trim().length && this.newAppointmentDate){
    const newAppointment:Appointment = {
      id: this.newAppointmentID++,
      title: this.newAppointmentDescription,
      date: this.newAppointmentDate
    }
    this.appointments.push(newAppointment);
    alert('Appointment added successfully!');
    this.newAppointmentDescription = '';
    this.newAppointmentDate = new Date();
  }
 }
}
