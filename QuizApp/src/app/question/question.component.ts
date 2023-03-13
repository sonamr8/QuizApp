import { Component,OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  public name: string="";
  public questionList:any=[];
  public currentQuestion:number=0;
  public points:number = 0;
  correctAnwer:number=0;
  incorrectAnswer:number=0;
  counter=60;
  interval$:any;
  progress:string="0";
  isQuizCompleted:boolean=false;
  resultis:boolean= false;

 constructor(private questionService :QuestionService){}
ngOnInit():void{
  this.name=localStorage.getItem('name')!
  this.getAllQuestions();
  this.startCounter()

}
getAllQuestions(){this.questionService.getQuestionJson().subscribe(res=>{
  this.questionList = res.questions})

}
nextQuestion(){
this.currentQuestion++
this.resetCounter()

}
previousQuestion(){
this.currentQuestion--
this.resetCounter()
}
answer(currentQ:number,option:any){
  if(currentQ === this.questionList.length){
    this.isQuizCompleted=true;
    this.stopCounter()
  }
  if(option.correct){
    this.points+=10;
    this.currentQuestion++;
    this.correctAnwer++;
    this.resetCounter()
    this.getProgress()
    this.result()

  }
  else{
    this.points-=5;
    this.incorrectAnswer++;
    this.currentQuestion++;
    this.resetCounter()
    this.getProgress()
    this.result()
  }
}

refresh(){
  this.resetCounter();
  this.currentQuestion=0;
  this.points=0;  
  this.counter=30;
  this.progress="0"
}
startCounter(){
this.interval$=interval(1000)
.subscribe(val=> {
  this.counter--;
if ( this.counter ===0){
  this.currentQuestion++;
  this.counter=30;
  this.points-=5;
}
})
setTimeout(()=>{
this.interval$.unsubscribe()
},300000)
};

stopCounter(){
  this.interval$.unsubscribe();
  this.counter=0;

}
resetCounter(){
this.stopCounter()
this.counter=30;
this.startCounter()
}
getProgress(){
  this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
  return this.progress
}
result():void {
  if (this.points >= 60) {
    this.resultis=true;
  }   
 
}


}

