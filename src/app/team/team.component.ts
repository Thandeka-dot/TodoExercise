import { Component } from '@angular/core';
import { NgFor } from '@angular/common';  //here we import NgFor from angular/common to repeat a portion of html
//tracks list items using object identity
import { FormsModule } from '@angular/forms'; // And we need to import the forms module for this form to use 
//angular features that enables data binding and we add it to [imports array]


@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgFor, FormsModule], //add formsModule to imports array and NGFor
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  //NgFor allows us to build data presentation lists and tables in our html
  status = [
    {id: 1, name: "Complete"},
    {id: 2, name: "InProgress"},
    {id: 3, name: "OutStanding"},
  ]
  task = '';
  team='';
  comments = '';
  selectedValue=null;

  data: any[] = [];
  filteredData: any[]=[]; // Add a property for filtered data
  searchTerm: string = ''; // Add a property for the search term
 // comments: any;

  onClickSubmit(){
    const formData= {
      task: this.task, //here we are referencing the input field value in the component class 
      team: this.team, //To access the class property we need to use this. syntax
      comments:this.comments,// Add comments to formData
      selectedValue: this.selectedValue //to retrieve the value of an input field
      
    }

    this.data.push(formData);
    this.filteredData = [...this.data] // Update filtered data
    this.resetForm(); // Reset form fields after submission
    console.log(this.data)
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.filteredData = [...this.data]; // Display all data if search term is empty
    } else {
      this.filteredData = this.data.filter(item =>
        item.team.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.task.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (item.comments && item.comments.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (item.selectedValue && item.selectedValue.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }

}
resetForm() {
  this.task = '';
  this.team = '';
  this.comments = '';
  this.selectedValue = null;
}
}
