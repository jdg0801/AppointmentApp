import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { OnInit } from '@angular/core'; // Interface for lifecycle hook

@Component({
  selector: 'app-appointment-list', // HTML tag to use this component
  standalone: true,  // Declares this as a standalone component (no NgModule needed)
  imports: [FormsModule, NgForOf], // Required modules for forms and *ngFor
  templateUrl: './appointment-list.html', // Link to HTML template
  styleUrl: './appointment-list.css' // Link to CSS styles
})
export class AppointmentList implements OnInit {
  
  // Properties to store new appointment details
  newAppointmentID: number = 0;  // Unique identifier for appointments
  newAppointmentDescription: string = '';  // Stores the appointment description
  newAppointmentDate: Date = new Date();  // Stores the appointment date
  appointments: Appointment[] = [] // Array to store all appointments

  // Lifecycle hook that runs when component initializes
  ngOnInit(): void { 
    console.log('ngOnInit called')
    // Retrieve appointments from localStorage
    let getAppointments = localStorage.getItem("appointments")
    
    // Parse stored appointments or initialize empty array if none exist
    this.appointments = getAppointments ? JSON.parse(getAppointments) : []
  }

  // Method to add new appointments
  addAppointment() {
    // Check if description is not empty and date is valid
    if(this.newAppointmentDescription.trim().length && this.newAppointmentDate) {
      // Create new appointment object
      const newAppointment:Appointment = {
        id: this.newAppointmentID++,
        title: this.newAppointmentDescription,
        date: this.newAppointmentDate
      }
      // Add to appointments array
      this.appointments.push(newAppointment);
      
      // Reset form fields
      this.newAppointmentDescription = '';
      this.newAppointmentDate = new Date();

      // Persist appointments to localStorage
      localStorage.setItem("appointments", JSON.stringify(this.appointments));
    }
  }

  // Method to delete appointments
  deleteAppointment(index: number) {
    // Remove appointment at specified index
    this.appointments.splice(index, 1);
    
    // Update localStorage after deletion
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }
}
