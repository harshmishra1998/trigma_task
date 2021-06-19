import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { VehicleService } from '../services/vehicle.services';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit, AfterViewInit {
  flip = false;
  forminfo: FormGroup;
  sub = false;
  @ViewChild('myTable') table: any;
  @ViewChild('searching') searching: ElementRef;
  ColumnMode = ColumnMode;
  vehiclelist: any;
  search: any;
  constructor(
    private VehicleServices: VehicleService
  ) {
  }
  ngOnInit(): void {
    this.formIntialization();
    this.getVehicleList()
  }

  formIntialization() {
    this.forminfo = new FormGroup({
      id: new FormControl(''),
      year: new FormControl('', Validators.required),
      make: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
    })
  }

  get f() {
    return this.forminfo.controls;
  }

  onSubmitData() {
    this.sub = true;
    if (this.forminfo.invalid) {
      return
    }
    let payload = {
      year: this.f.year.value,
      make: this.f.make.value,
      model: this.f.model.value,
    }
    if (this.f.id.value !== null && this.f.id.value !== "") {
      payload['id'] = this.f.id.value
      this.VehicleServices.updateVehicle(payload).then((res) => {
        console.log(res)
        this.getVehicleList()
        this.manageForm();
      })
    }
    // const payload: form = this.signupinfo.value;
    else {
      this.VehicleServices.createVehicle(payload).then((res) => {
        console.log(res)
        this.getVehicleList();
        this.manageForm()
      }).catch((error) => {
        console.log(error)
      })
    }

  }
  getVehicleList(page: number = 1, pageSize: number = 10, search: string = null) {
    let payload = {
      PageNumber: page,
      PageSize: pageSize,
      search: this.search ? this.search : search,
    }
    this.VehicleServices.getVehicle(payload).then((res) => {
      this.vehiclelist = res.data
    }).catch((error) => {
      console.log(error)
    })
  }
  manageForm() {
    this.sub = false;
    this.formIntialization();
    this.rotate()
  }
  ngAfterViewInit() {
    const search = fromEvent<any>(this.searching.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      debounceTime(2000)
    )
    search.subscribe(res => {
      this.search = res
      this.getVehicleList()
      console.log(res)
    })
  }
  rotate() {
    this.flip = !this.flip;
  }

  edititem(row) {
    this.flip = !this.flip;
    this.forminfo.patchValue({
      id: row.id,
      first_name: row.first_name,
      last_name: row.last_name,
      class: row.class,
    })
  }

  newadd() {
    this.sub = false;
    this.formIntialization();
    this.rotate()
  }
  deleteitem(row) {
    this.VehicleServices.deleteVehicle(row.id).then((res) => {
      this.getVehicleList()
    }).catch((error) => {
      console.log(error)
    })
  }

}
