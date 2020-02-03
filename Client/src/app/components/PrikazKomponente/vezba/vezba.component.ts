import { Component, OnInit } from "@angular/core";
import { VezbeService } from "src/services/VezbeService";
import { Vezba } from "src/models/Vezba";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Location } from "@angular/common";
import { dashCaseToCamelCase } from "@angular/compiler/src/util";
import { validateVerticalPosition } from "@angular/cdk/overlay";

@Component({
  selector: "app-vezba",
  templateUrl: "./vezba.component.html",
  styleUrls: ["./vezba.component.css"]
})
export class VezbaComponent implements OnInit {
  vezba: Vezba = null;

  constructor(
    private vezbeService: VezbeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get("ime"));
    this.vezba = null;
    this.vezbeService
      .getVezba(this.route.snapshot.paramMap.get("ime"))
      .subscribe(vezbaIzgled => {
        this.vezba = vezbaIzgled;
      });
  }

  kastujUDaNe(promenjljiva: string): string {
    let vrati: string = null;
    if (promenjljiva == "true") vrati = "da";
    else vrati = "ne";

    return vrati;
  }

  goBack(){
    this.location.back();
  }
}
