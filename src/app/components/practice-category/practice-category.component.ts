import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IPractice } from 'src/app/interface/ipractice';
import { IPracticeCategory } from 'src/app/interface/ipractice-category';
import { PracticeCategoryService } from 'src/app/services/practice-category.service';
import { PracticeService } from 'src/app/services/practice.service';
import { environment } from 'src/environments/environment';

@Component({

  selector: 'app-practice-category',
  templateUrl: './practice-category.component.html',
  styleUrls: ['./practice-category.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PracticeCategoryComponent implements OnInit {

  showRec: boolean = false;
  allPracticeCatogory: any;
  alldata: any;
  selectedPracticeId: any = localStorage.getItem('userId');
  Practices!: any;
  PracticesData!: IPractice[];
  showEditForm: boolean = false;
  editFormData!: IPracticeCategory;
  practiceCategoryForm!: FormGroup;
  editPracticeCategoryForm!: FormGroup;
  DeletePractice: boolean = false;
  loading: boolean = false;
  checked: boolean = true;
  isActive: any;
  defaultId: boolean = true;
  total!: number;
  totalWeightage!: number;
  getId!: number;
  rowLimit: number = environment.rowLimit;
  saltingIndex!: any;

  constructor(public practiceCategorySerivce: PracticeCategoryService,
    private practiceService: PracticeService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    const myNumber = document.getElementById("totalWeightage") as HTMLParagraphElement;
    if (myNumber !== null) {
      const value = parseInt(myNumber.innerText);
      if (value < 100) {
        myNumber.classList.add("yellow");
        myNumber.classList.remove("green", "red");
      } else if (value === 100) {
        myNumber.classList.add("green");
        myNumber.classList.remove("yellow", "red");
      } else {
        myNumber.classList.add("red");
        myNumber.classList.remove("yellow", "green");
      }
    }
  }

  ngOnInit(): void {

    if (this.practiceCategorySerivce.selectedOption) {
      this.selectedPracticeId = this.practiceCategorySerivce.selectedOption;
    }
    this.getAllPractices();
    this.getAllPracticeCategories();
    this.practiceCategoryForm = this.fb.group({
      practice: ['', Validators.required],
      practiceCategory: this.fb.array([this.initCategories()])
    });

    this.editPracticeCategoryForm = this.fb.group({
      practiceCategoryId: [],
      practiceId: [],
      categoryName: ['', [Validators.required, Validators.maxLength(500)]],
      additionalInfo: [''],
      orderingIndex: [],
      weightage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      isActive: [],
      lastModifiedDate: ['2023-02-21T14:48:50.012Z'],
      lastModifiedBy: ['Chirag', [Validators.required]]
    })
  }

  // Initialize practice category form
  initCategories() {
    return this.fb.group({
      practiceId: [],
      categoryName: ['', [Validators.required, Validators.maxLength(500)]],
      weightage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      additionalInfo: [''],
      orderingIndex: [0],
      isActive: [true],
      lastModifiedDate: ['2023-02-21T14:48:50.012Z'],
      lastModifiedBy: ['Chirag', [Validators.required]]
    })
  }

  // Get the practice category form array
  get practiceCategoryForms() {
    return this.practiceCategoryForm.get('practiceCategory') as FormArray;
  }

  // Save the practice category form
  savePracticeCategoryForm(body: any[]) {
    let practiceValue = this.practiceCategoryForm.get('practice')?.value
    const practiceCategoryForms = this.practiceCategoryForm.get('practiceCategory') as FormArray;
    practiceCategoryForms.controls.forEach((control: AbstractControl) => {
      const practiceId = control.get('practiceId')?.setValue(practiceValue);
    });

    body = practiceCategoryForms.value
    this.practiceCategorySerivce.addPracticeCategory(body)
      .subscribe({
        next: () => {
          alert("added successfully")
          this.ngOnInit()
        }
      })
  }

  // Get the total weightage from the database
  calculateWeightage(): number {
    this.practiceCategorySerivce.getPracticeCategoryByPracticeId(this.practiceCategoryForm.get('practice')?.value)
      .subscribe({
        next: (data) => {
          const length = data.data.length;
          //this.saltingIndex = length;
          let i = 0
          this.total = 0
          while (i < length) {
            if (data.data[i]['isActive'] == true) {
              this.total += data.data[i]['weightage']
              i++
            }
            else {
              i++
            }
          }
        }
      })

    return this.total;
  }

  // isActive deafult check event for practice category form
  checkEvent(event: any, index: number) {
    this.checked = event.checked;
    this.isActive = this.practiceCategoryForms.at(index).get('isActive')?.setValue(this.checked)

  }

  // Remove a practice category form group from the form array
  removePracticeCategory(index: number) {
    this.practiceCategoryForms.removeAt(index);
    //this.saltingIndex--;
  }

  // Add a new practice category form group to the form array
  addPracticeCategory(index: number) {
    this.practiceCategoryForms.push(this.fb.group({
      practiceId: [],
      categoryName: ['', [Validators.required, Validators.maxLength(500)]],
      weightage: ['', [Validators.required, Validators.max(100)]],
      additionalInfo: [''],
      orderingIndex: [index++],
      isActive: [true, [Validators.required]],
      lastModifiedDate: ['2023-02-21T14:48:50.012Z'],
      lastModifiedBy: ['Chirag', [Validators.required]]
    }));
  }

  // Get total weightage from the form group
  getTotalWeightage(): number {
    let formTotal = 0;
    const practiceCategoryForms = this.practiceCategoryForm.get('practiceCategory') as FormArray;
    practiceCategoryForms.controls.forEach((control: AbstractControl) => {
      const weightage = control.get('weightage')?.value;
      if (weightage) {
        formTotal += weightage;
      }
    });
    this.totalWeightage = this.total + formTotal
    return this.totalWeightage;
  }

  // Form submission validation
  isWeightageValid(): boolean {
    return this.totalWeightage === 100
  }

  // Reset the form group
  resetPracticeCategoryForm(index: number) {
    this.practiceCategoryForms.at(index).reset();
    this.practiceCategoryForms.at(index).get('isActive')?.setValue(this.checked);
  }

  // isActive deafult check event for edit practice category form
  checkedEvent(event: any) {
    this.checked = event.checked;
    this.isActive = this.practiceCategoryForms.get('isActive')?.setValue(this.checked)
  }

  // Hides edit form when cancelled
  cancel() {
    this.showEditForm = false;
  }

  // Update the selected practice category 
  updateForm(body: any) {
    debugger
    this.practiceCategorySerivce.editPracticeCategory(this.getId, body)
      .subscribe({
        next: (formData) => {
          formData = body;
          alert('Practice Category edited successfully!')
          this.showEditForm = false;
          this.ngOnInit();
        },
        error: () => {
          alert('Please try again')
        }
      })
  }

  // Get all Practices
  getAllPractices() {
    this.practiceService.getAllPractices()
      .subscribe({
        next: (data) => {
          this.Practices = data;
          this.PracticesData = this.Practices.data
        }
      })
  }

  showAllData(event: any) {
    this.showRec = event.checked
    this.getAllPracticeCategories()
  }

  // Get All Practice Categories
  getAllPracticeCategories() {
    this.practiceCategorySerivce.getAllPracticeCategories().subscribe((res: any) => {
      this.allPracticeCatogory = res.data;
      if (this.showRec && !this.selectedPracticeId) {
        this.alldata = this.allPracticeCatogory;
      }

      else if (this.selectedPracticeId > 0) {
        if (this.showRec) {
          var result = this.allPracticeCatogory.filter((res: any) => res.practiceId == this.selectedPracticeId);
          this.alldata = result;
        }
        else {
          var result = this.allPracticeCatogory.filter((res: any) => res.practiceId == this.selectedPracticeId && res.isActive === true);
          this.alldata = result;
        }
      }

      else if (!this.showRec && !this.selectedPracticeId) {
        this.alldata = this.allPracticeCatogory.filter((res: any) => res.isActive === true);
      }
      this.alldata.reverse()
    })
  }

  // Filtering table based on selected radio button
  filterData(id: any) {
    if (this.defaultId) {
      this.selectedPracticeId = id;
      this.practiceCategorySerivce.selectedOption = id;
      this.getAllPracticeCategories();
      this.defaultId = false;
    } else {
      this.selectedPracticeId = id;
      this.practiceCategorySerivce.selectedOption = id;
      this.getAllPracticeCategories();
    }

  }

  // Update practice category
  update(id: number) {
    this.showEditForm = true;
    this.getId = id;
    this.practiceCategorySerivce.getPracticeCategoryById(id)
      .subscribe({
        next: (formData) => {
          this.editFormData = formData.data;
          this.editPracticeCategoryForm.patchValue(this.editFormData);
        }
      })
  }

  // Delete confirmation event
  confirm(event: Event, id: number) {
    this.DeletePractice = true;
    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.practiceCategorySerivce.deletePracticeCategory(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: "info",
              summary: "Confirmed",
              detail: "Practice Category Deleted Successfully!"
            });
            this.ngOnInit()
          },
          error: () => {
            this.messageService.add({
              severity: "error",
              summary: "Failed",
              detail: "Couldn't delete, please try again!"
            });
          }
        })

      },
      reject: () => {
      }
    });
  }

}

