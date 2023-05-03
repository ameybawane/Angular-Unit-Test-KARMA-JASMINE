import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PracticeService } from 'src/app/services/practice.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  posts: any;
  value!: boolean;
  loading: boolean = false;
  AddPractice: boolean = false;
  addPracticeForm!: FormGroup;
  DeletePractice: boolean = false;
  pGroup: any;
  show: boolean = true;
  disable: boolean = false;
  populate: any;
  update: any;
  groupName: any;
  practiceId: any;
  checked: boolean = true;
  isActive: any;
  showRecord: boolean = false;
  record: boolean = false;
  dataArray: any = [];

  constructor(private fb: FormBuilder, private service: PracticeService) {

  }

  ngOnInit(): void {
    this.readAllPractice();
    


    //VALIDATIONS
    this.addPracticeForm = this.fb.group({
      practiceId: [0, [Validators.required]],
      practiceGroupId: ['', [Validators.required]],
      practiceName: ['', [Validators.required]],
      isActive: [true, []],
    });
  }

  //CHECK BOX

  checkedEvent(event: any) {
    this.checked = event.checked;
    this.isActive = this.addPracticeForm.get('isActive')?.setValue(this.checked)
  }

  checkedEventActive(event: any) {
    this.showRecord = event.checked;
    this.readAllPractice();
    this.readAllPracticeGroup();
  }

  //METHODS
  readAllPractice() {
    this.dataArray = [];
    this.service.getAllPractices().
      subscribe(
        practice => {
          if (this.showRecord) {
            this.posts = practice.data;
            this.loading = false;
          }
          else {
            practice.data?.forEach((x: any) => {
              if (x.isActive == true) {
                this.dataArray.push(x);
                this.loading = false;
              }
            })
            this.posts = this.dataArray
          }
          this.readAllPracticeGroup();
        });
  }


  readAllPracticeGroup() {
    this.service.getAllPracticeGroups().
      subscribe(
        newData => {
          this.pGroup = newData.data;
          this.pGroup.forEach((student: any) => {
            this.posts?.forEach((practice: any) => {
              if (student.practiceGroupId == practice.practiceGroupId) {
                practice.practiceGroupName = student.practiceGroupName;
              }
            });
          });
        });
  }

  updateRecord(id: number) {
    this.show = false;
    this.service.getPracticebyId(id).subscribe(
      newData => {
        this.populate = newData.data.practiceGroupId;
        console.log(this.populate)
        this.practiceId = newData.data.practiceId;

        this.pGroup?.forEach((student: any) => {
          if (this.populate == student.practiceGroupId) {
            this.groupName = student.practiceGroupName;
          }
        });
        this.addPracticeForm.patchValue(newData.data);
      })
  }

  addPractice() {
    if (this.show) {
      this.show = true;
      this.disable = true;

      const data = {
        practiceGroupId: this.addPracticeForm.value.practiceGroupId,
        practiceName: this.addPracticeForm.value.practiceName,
        isActive: this.addPracticeForm.value.isActive,
        lastModifiedDate: new Date(),
        lastModifiedBy: "xyz"
      };

      this.service.postPractice(data)
        .subscribe({
          next: (response) => {
            alert('Sub Practice is Added Successfully!');
            this.disable = false;
            this.show = false;
            this.ngOnInit();
            this.AddPractice = false;
          }
        })
    }
    else {
      this.posts?.forEach((x: any) => {
        if (x.practiceGroupId == this.populate) {
          this.update = {
            practiceId: this.practiceId,
            practiceGroupId: this.addPracticeForm.value.practiceGroupId,
            practiceName: this.addPracticeForm.value.practiceName,
            isActive: this.addPracticeForm.value.isActive,
            lastModifiedDate: new Date(),
            lastModifiedBy: "xyz"
          };
        }
      })
      this.updatePractice();
    };
  }

  updatePractice() {
    this.service.putPractice(this.practiceId, this.update).
      subscribe(data => {
        alert('Sub Practice is Updated Successfully!');
        this.ngOnInit();
      });
  }

  DeletePr(id: number): void {
    if (confirm('Are you sure you want to delete the selected row?')) {
      this.service.softdeletePractice(id).
        subscribe(response => {
          alert('Sub Practice is Deleted!');
          this.ngOnInit();
        })
    }
    else {
      alert('Failed to delete!');
    }
  }

}
