import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { PracticeGroupService } from 'src/app/services/practice-group.service'

@Component({
  selector: 'app-practice-group',
  templateUrl: './practice-group.component.html',
  styleUrls: ['./practice-group.component.scss']
})
export class PracticeGroupComponent implements OnInit {
  posts: any;
  loading: boolean = false;
  AddPracticeGroup: boolean = false;
  addPracticeGroupForm!: FormGroup;
  DeletePracticeGroup: boolean = false;
  selectedValue!: string;
  isActive: any;
  show: boolean = true;
  update: any;
  populate: any;
  checked: boolean = true;
  showRecord: boolean = false;
  record: boolean = false;
  dataArray: any = [];


  constructor(private fb: FormBuilder, private service: PracticeGroupService,
    private primengConfig: PrimeNGConfig) {
  }


  ngOnInit(): void {
    this.readAllPracticeGroup();

    //VALIDATIONS
    this.addPracticeGroupForm = this.fb.group({
      practiceGroupId: [0, [Validators.required]],
      practiceGroupName: ['', [Validators.required]],
      isActive: [true, []]
    });
  }

  checkedEvent(event: any) {
    this.checked = event.checked;
    this.isActive = this.addPracticeGroupForm.get('isActive')?.setValue(this.checked)
  }

  checkedEventActive(event: any) {
    this.showRecord = event.checked;
    this.readAllPracticeGroup();
  }

  updateRecord(id: number) {
    this.show = false;
    this.service.getPRbyId(id).subscribe(
      newData => {
        this.populate = newData.data;
        this.addPracticeGroupForm.patchValue(this.populate);
      })

  }

  readAllPracticeGroup() {
    this.dataArray = [];
    this.service.getAllPracticeGroups().
      subscribe(
        data => {
          if (this.showRecord) {
            this.posts = data.data;
            this.loading = false;
          }
          else {
            data.data?.forEach((x: any) => {
              if (x.isActive == true) {
                this.dataArray.push(x);
                this.loading = false;
              }
            })
            this.posts = this.dataArray
          }
        });
  }

  addPracticeGroup() {
    const data = {
      groupId: 0,
      practiceGroupName: this.addPracticeGroupForm.value.practiceGroupName,
      isActive: this.addPracticeGroupForm.value.isActive,
      lastModifiedDate: new Date(),
      lastModifiedBy: "xyz"
    };

    if (this.show) {
      this.service.postPracticeGroup(data).subscribe({
        next: (response) => {
          alert('Practice is Added Successfully!');
          this.ngOnInit();
          this.AddPracticeGroup = false
        }
      })
    }
    else {
      this.posts.forEach((x: any) => {
        if (x.practiceGroupId == this.populate.practiceGroupId) {
          this.update = {
            groupId: 0,
            practiceGroupId: this.populate.practiceGroupId,
            practiceGroupName: this.addPracticeGroupForm.value.practiceGroupName,
            isActive: this.addPracticeGroupForm.value.isActive,
            lastModifiedDate: new Date(),
            lastModifiedBy: "xyz"
          };
          this.updatePR();
        }
      })
    };
  }

  updatePR() {
    this.service.putPracticeGroup(this.populate.practiceGroupId, this.update).
      subscribe(data => {
        alert('Practice is Updated Successfully!');
        this.ngOnInit();
      });
  }


  deletePR(id: number): void {
    if (confirm('Are you sure you want to delete the selected row?')) {
      this.service.softdeletePracticeGroup(id).subscribe(response => {
        alert('Practice is Deleted');
        this.ngOnInit();
      })
    }
    else {
      alert('Failed to delete!');
    }
  }

}



