
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { forkJoin, retry, switchMap } from 'rxjs';
import { PracticeCategoryService } from 'src/app/services/practice-category.service';
import { PracticeTemplateService } from 'src/app/services/practice-template.service';
import { PracticeService } from 'src/app/services/practice.service';

@Component({
  selector: 'app-report-template',
  templateUrl: './report-template.component.html',
  styleUrls: ['./report-template.component.scss']
})
export class ReportTemplateComponent implements OnInit {

  PracticeGroup:any=[
    {id:1,PracticeGroupName:'QA' , isActive:true},
    {id:2,PracticeGroupName:'BA' , isActive:true},
    {id:3,PracticeGroupName:'Dev' , isActive:true}
  ]
  @ViewChild('table') table!: Table;

  PracticeGroupName:string=''
  allPractice: any
  allPracticeTemplate: any
  loading = false;
  allPracticeCategory: any
  selectedPracticeId: any;
  nestedArray: any
  nestedData: any
  mergedPracticeTemplates: any
  expanded = false;
  indexValue: number = 0
  record: boolean = false
  allDataCombined: any
  fontColorChanger: boolean = false
  isSelected = false;
  selectedRow:any
  data: any = []
  userData2:any|undefined
  practiceGroupId:number=0
  defaultId: any;
  totalBA:number=0
  totalQA:number=0
  totalDev:number=0
  rowBackground:boolean=false
  selectedID=0

  constructor(
    private PracticeService: PracticeService,
    private PracticeTemplateService: PracticeTemplateService,
    private practiceCategorySerivce: PracticeCategoryService
  ) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.loading = false;
    // }, 3000);
    this.selectedPracticeId = localStorage.getItem('userId')
    
    this.getAllPractice();
    this.getAllPracticeCategory()
    this.getPracticeName()
  }

  onDrag(event:any){

  }
  getAllPractice() {
    //debugger
    this.PracticeService.getAllPractices().subscribe((res: any) => {
      this.allPractice = res.data;
    })
  }
  getAllPracticeCategory() {
    this.practiceCategorySerivce.getAllPracticeCategories()
      .pipe(
        switchMap((res: any) => {
          this.allPracticeCategory = res.data;
          return this.PracticeTemplateService.getAllPracticeTemplate();
        })
      )
      .subscribe((res) => {
        this.allPracticeTemplate = res.data;
        this.allPracticeTemplate=this.sortObjectsByOrderingIndex(this.allPracticeTemplate)
        this.allPracticeCategory = this.sortObjectsByOrderingIndex(this.allPracticeCategory)
        
        this.nestedData = this.mergePracticeCategoriesAndTemplates(this.allPracticeCategory, this.allPracticeTemplate);
        this.allDataCombined = this.nestedData
        this.pushTabName()
        if (this.record) {
          this.filterAllPractice( this.selectedPracticeId)
          this.record = false
        }
      });
  } 

  mergePracticeCategoriesAndTemplates(practiceCategories: any, practiceTemplates: any) {
    this.nestedArray = [];
    practiceCategories.forEach((practiceCategory: any) => {
      const matchingTemplates = practiceTemplates.filter((template: any) => template.practiceCategoryId === practiceCategory.practiceCategoryId);
      const newPracticeCategory = {
        ...practiceCategory,
        practiceTemplates: matchingTemplates
      };
      this.nestedArray.push(newPracticeCategory);
    });
    this.record = true
    return this.nestedArray;
  }

  filterAllPractice(id: any) {
    if (this.record) {
      var result = this.nestedData?.filter((res: any) => res.practiceId == id)
      this.allDataCombined = result;
      
    }
    else {
      var result = this.nestedData?.filter((res: any) => res.practiceId == id)
      this.allDataCombined = result;
      console.log(this.allDataCombined);
    }
  }

  sortObjectsByOrderingIndex(obj:any) {
    obj.sort((a:any, b:any) => {
      return a.orderingIndex - b.orderingIndex;
    });
    return obj;
  }

  toggleExpandCollapseAll(id:any) {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.expandAll();
      this.getExpandedRow(id)
    } else {
      this.collapseAll();
    }
  }

  expandAll() {
    this.allDataCombined.forEach((data: any) => {
      this.table.toggleRow(data);
    });
  }

  collapseAll() {
    this.allDataCombined.forEach((data: any) => {
      this.table.toggleRow(data);
    });
  }

  changeFont(asd: any, i: any) {
    this.fontColorChanger = !this.fontColorChanger
  }

  pushTabName() {
    for (let index = 0; index < this.allDataCombined.length; index++) {
      let subData = { "data": index }
      this.data.push(subData)
    }
  }
  expandAllChangeFont() {
    this.fontColorChanger = !this.fontColorChanger
  }

  getExpandedRow(id: any) 
  { 
    if(this.selectedRow==id){
      this.selectedRow=-1;
    }else{
    this.selectedRow=id;
    }
  }
    
  getPracticeName(){
    this.userData2 = JSON.parse(localStorage.getItem("userId")!);
    this.practiceGroupId= this.userData2.practiceGroupID;
    this.PracticeGroup?.forEach((res:any)=>{
    if(res.id== this.practiceGroupId){
     this.defaultId=res.id;
     this.PracticeGroupName=res.PracticeGroupName;
         } 
       })
  }

  onRowDrop(event:any,tableValue:any)
  {      
       if( event.dragIndex == event.dropIndex){
         return
       }      
       else{
        this.loading = true
        const sortedPracticeCategory = this.sortObjectsByOrderingIndex(this.allDataCombined)
        const update1 = sortedPracticeCategory[event.dragIndex]
        const update2 = sortedPracticeCategory[event.dropIndex]
        
        const update1OrderingIndex = this.allDataCombined[event.dragIndex].orderingIndex
        const update2OrderingIndex = this.allDataCombined[event.dropIndex].orderingIndex
        
        update1.orderingIndex = update2OrderingIndex
        update2.orderingIndex = update1OrderingIndex

        forkJoin([
          this.practiceCategorySerivce.editPracticeCategory(update1.practiceCategoryId,update1),
          this.practiceCategorySerivce.editPracticeCategory(update2.practiceCategoryId,update2)
        ]).subscribe(x => {
           this.getAllPracticeCategory();
          this.loading = false
          this.rowBackground=false
        },(error)=>{
          this.loading=false
        })
       } 
       
     }

     onRowDropChild(event:any , tableValue:any){
      if(event.dragIndex == event.dropIndex){
        return
      }
      else{
      this.loading=true
      const sortedPracticeTemplate = this.sortObjectsByOrderingIndex(tableValue)
      
       const update1 = sortedPracticeTemplate[event.dragIndex]
       const update2 = sortedPracticeTemplate[event.dropIndex]
              
       const update1OrderingIndex = update1.orderingIndex
       const update2OrderingIndex = update2.orderingIndex
       
       update1.orderingIndex = update2OrderingIndex
       update2.orderingIndex = update1OrderingIndex

       forkJoin([
        this.PracticeTemplateService.editPracticeTemplate(update1.practiceTemplateId,update1),
        this.PracticeTemplateService.editPracticeTemplate(update2.practiceTemplateId,update2)
      ]).subscribe(x => {
          this.getAllPracticeCategory();
        this.loading = false
       
      },(error)=>{
        this.loading=false
      })
    }
     }

     selectEntireRow(product:any){
      this.rowBackground=true
      console.log(product);
      this.selectedID = product.practiceCategoryId
      //
     }
     unSelectRow(){
      this.selectedID = 0
      this.rowBackground=false
     }
}