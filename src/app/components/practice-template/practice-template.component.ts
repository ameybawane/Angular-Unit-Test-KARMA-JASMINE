import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { max } from 'rxjs';
import { IPracticeTemplate } from 'src/app/interface/ipractice-template';
import { PracticeCategoryService } from 'src/app/services/practice-category.service';
import { PracticeTemplateService } from 'src/app/services/practice-template.service';
import { PracticeService } from 'src/app/services/practice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-practice-template',
  templateUrl: './practice-template.component.html',
  styleUrls: ['./practice-template.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PracticeTemplateComponent implements OnInit {
  AddChildPractice: boolean = false;
  addChildPracticeForm!: FormGroup;
  posts!: any;
  loading: boolean = false;
  DeleteProject: boolean = false;
  checked!: string;
  practiceCategoryId!: number;
  practiceTemplateList: IPracticeTemplate[] = [];
  practiceCategoryDetails: any;
  selectedPracticeId: any;
  practice: any;
  practiceTemplateForm!: FormGroup;
  showEditForm: boolean = false;
  showAddForm: boolean = false;
  editFormData: any;
  editPracticeTemplateForm!: FormGroup;
  isActive: any;
  editPracticeTemplateId: any;
  selectPracticeId!: any;
  total!: number;
  totalWeightage!: number;
  showRec: any;
  practiceDetails: any;
  rowLimit: number = environment.rowLimit;
  orderingIndex:any=[];
  maxIndex!:number;
  constructor(
    private fb: FormBuilder,
    private practiceTemplateservice: PracticeTemplateService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private practiceCategoryService: PracticeCategoryService,
    private practiceService: PracticeService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectPracticeId = params['selectedOption'];
    });

     //Get PracticeCategory By Id
     this.route.paramMap.subscribe({
      next: (params) => {
        this.practiceCategoryId = Number(params.get('id'));
        if (this.practiceCategoryId != null) {
          this.practiceCategoryService.getPracticeCategoryById(Number(this.practiceCategoryId)).subscribe({
            next: (practiceCategory) => {
              debugger
              this.practiceCategoryDetails = practiceCategory.data;
              this.practiceService.getPracticebyId(this.practiceCategoryDetails.practiceId).subscribe({
                next: (practice) => {
                  debugger
                  this.practiceDetails = practice.data;
                },
                error: (response) => {
                  console.log(response)
                }
              })
            },
            error: (response) => {
              console.log(response)
            }
          })
        }
      }
    })
    this.practiceTemplateForm = this.fb.group({
      practiceTemplate: this.fb.array([this.initializePracticeTemplate()])
    });
    console.log(this.selectPracticeId)
    this.editPracticeTemplateForm = this.fb.group({
      practiceCategoryId: [],
      question: ['',[Validators.required, Validators.maxLength(500)]],
      weightage: ['',[Validators.required, Validators.min(0), Validators.max(100),Validators.pattern('[0-9]*')]],
      additionalInfo: [],
      orderingIndex: [],
      isActive: [],
      lastModifiedDate: ['2023-02-21T14:48:50.012Z'],
      lastModifiedBy: ['Chirag', [Validators.required]]
    })

   
    this.getpracticeTemplateByPracticeCategoryId();
    //Call calculateWeightage
    this.calculateWeightage();
  }

  // Initialize practice template form
  initializePracticeTemplate() {
    return this.fb.group({
      isActive: [true],
      lastModifiedDate: ['2023-02-21T14:48:50.012Z'],
      lastModifiedBy: ['Chirag', [Validators.required]],
      practiceCategoryId: [this.practiceCategoryId],
      question: ['', [Validators.required, Validators.maxLength(500)]],
      weightage: ['', [Validators.required, Validators.min(0), Validators.max(100),Validators.pattern('[0-9]*')]],
      additionalInfo: [''],
      orderingIndex: [0],
    })

  }

  // isActive deafult check event for practice Template form
  checkEvent(event: any, index: number) {
    this.checked = event.checked;
    this.isActive = this.practiceTemplateForms.at(index).get('isActive')?.setValue(this.checked)
  }

  // Hides edit form when cancelled
  cancel() {
    this.showEditForm = false;
  }

  // Get the total weightage from the database
  calculateWeightage(): number {
    this.practiceTemplateservice.getPracticeTemplateByPracticeCategoryId(this.practiceCategoryId)
      .subscribe({
        next: (data) => {
          const length = data.data.length;
          let i = 0
          this.total = 0
          while (i < length) {
            debugger
            if (data.data[i]['isActive'] == true)
              this.total += data.data[i]['weightage']
            i++
          }
          console.log(this.total);
        }
      })

    return this.total;
  }

  // Get the practice template form array
  get practiceTemplateForms() {
    return this.practiceTemplateForm.get('practiceTemplate') as FormArray;
  }


  // Add a new practice template form group to the form array
  addPracticeTemplate(index: number) {
    debugger
    this.practiceTemplateForms.push(this.fb.group({
      isActive: [true],
      lastModifiedDate: ['2023-02-21T14:48:50.012Z'],
      lastModifiedBy: ['Chirag', [Validators.required]],
      practiceCategoryId: [this.practiceCategoryId],
      question: ['', [Validators.required, Validators.maxLength(50)]],
      weightage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      additionalInfo: [''],
      orderingIndex: [index++],
    }));
  }

  showAllRecords(event: any) {
    this.showRec = event.checked
    this.getpracticeTemplateByPracticeCategoryId();
  }

  //getpracticeTemplate By PracticeCategoryId
  getpracticeTemplateByPracticeCategoryId() {
    this.practiceTemplateservice.getPracticeTemplateByPracticeCategoryId(this.practiceCategoryId).subscribe({
      next: (practiceTemplate) => {
        if (this.showRec) {
          this.practiceTemplateList = practiceTemplate.data;
        }
        else {
          var data = practiceTemplate.data.filter((data: any) => data.isActive == true);
          this.practiceTemplateList = data;
        }
      },
      error: (response) => {
        console.log(response)
      }

    })
  }


  // Get total weightage from the form group
  getTotalWeightage(): number {
    let formTotal = 0;
    const practiceTemplateForms = this.practiceTemplateForm.get('practiceTemplate') as FormArray;
    practiceTemplateForms.controls.forEach((control: AbstractControl) => {
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

  // Remove a practice Template form group from the form array
  removePracticeTemplate(index: number) {
    debugger
    console.log(this.practiceTemplateList)
    this.practiceTemplateForms.removeAt(index);
  }

  // Reset the form group
  resetPracticeTemplateForm(index: number) {
    var result= this.practiceTemplateForms.at(index);
    result.get('question')?.reset();
    result.get('weightage')?.reset();
    result.get('additionalInfo')?.reset();
  }

  
  // isActive deafult check event for edit practice template form
  checkedEvent(event: any) {
    this.checked = event.checked;
    this.isActive = this.practiceTemplateForms.get('isActive')?.setValue(this.checked)
  }

  // Save the practice Template form
  savePracticeTemplateForm(body: any[]) {
    debugger
    this.practiceTemplateservice.addPracticeTemplate(this.practiceTemplateForms.value)
      .subscribe({
        next: () => {
          alert("Practice Template Added Successfully !");
          this.ngOnInit();
        }
      })
      console.log(this.practiceTemplateForms.value);
      
  }
  //edit practice Template Form
  edit(id: number) {
    this.showEditForm = true;
    this.editPracticeTemplateId = id;
    this.practiceTemplateservice.getPracticeTemplateById(id)
      .subscribe({
        next: (formData) => {
          this.editFormData = formData.data;
          this.editPracticeTemplateForm.patchValue(this.editFormData);
        }
      })
  }

  // Update the selected practice template 
  updateForm(body: any) {
    body.practiceTemplateId = this.editPracticeTemplateId;
    this.practiceTemplateservice.editPracticeTemplate(this.editPracticeTemplateId, body)
      .subscribe({
        next: (formData) => {
          console.log(formData)
          alert('Practice Template Edited Successfully !');
          this.showEditForm = false;
          this.selectedPracticeId = this.editPracticeTemplateId;
          this.ngOnInit();
        },
        error: () => {
          alert('Please try again')
        }
      })
  }

  // Delete confirmation event
  confirm(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.practiceTemplateservice.deletePracticeTemplate(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: "info",
              summary: "Confirmed",
              detail: "Practice Template Deleted Successfully !"
            });
            this.ngOnInit()
          },
          error: () => {
            this.messageService.add({
              severity: "error",
              summary: "Failed",
              detail: "Couldn't delete, please try again"
            });
          }
        })
      },
      reject: () => {
      }
    });
  }

}
