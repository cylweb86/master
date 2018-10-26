import { NgModule } from '@angular/core';
import { StatusPipe } from './status/status';
import { TypePipe } from './type/type';
import { LevelPipe } from './level/level';
import { DiffertimePipe } from './differtime/differtime';
import { ShortenPipe } from './shorten/shorten';
import { TimePipe } from './time/time';
import { RevenuePipe } from './revenue/revenue';
import { OperatePipe } from './operate/operate';
import { TestPipe } from './test/test';
import { NumtoupperPipe } from './numtoupper/numtoupper';
import { ApprovalPipe } from './approval/approval';
import { ArrangePipe } from './arrange/arrange';
import { JobPipe } from './job/job';
import { JoinPipe } from './join/join';
import { TopicnewPipe } from './topicnew/topicnew';
import { ZeroPipe } from './zero/zero';
@NgModule({
    declarations: [
        StatusPipe,
        TypePipe,
        LevelPipe,
        DiffertimePipe,
        ShortenPipe,
        TimePipe,
        RevenuePipe,
        OperatePipe,
        TestPipe,
        NumtoupperPipe,
        ApprovalPipe,
        ArrangePipe,
        JobPipe,
        JoinPipe,
        TopicnewPipe,
        ZeroPipe
    ],
    imports: [],
    exports: [
        StatusPipe,
        TypePipe,
        LevelPipe,
        DiffertimePipe,
        ShortenPipe,
        TimePipe,
        RevenuePipe,
        OperatePipe,
        TestPipe,
        NumtoupperPipe,
        ApprovalPipe,
        ArrangePipe,
        JobPipe,
        JoinPipe,
        TopicnewPipe,
        ZeroPipe
    ]
})
export class PipesModule { }
