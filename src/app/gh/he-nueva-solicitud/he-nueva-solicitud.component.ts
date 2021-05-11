import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ngx-materialize';
import { HorasExtrasService } from '../horasextras/horasextras.service';
import { Turno } from '../models/turno.model';
import { User } from '../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoPlanilla } from '../models/planilla.model';
import { Area } from '../models/area.model';
import { HoraExtra, SolicitudHoraExtra } from '../models/horaextra';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-he-nueva-solicitud',
  templateUrl: './he-nueva-solicitud.component.html',
  styleUrls: ['./he-nueva-solicitud.component.scss']
})
export class HeNuevaSolicitudComponent implements OnInit {
    loading = $('#loading');  

    estaGuardando: boolean = false;
    esHorarioValido: boolean = true;

    lhorasextra: Array<HoraExtra> = new Array<HoraExtra>();  // Listado de horas extra
    lnewhorasextra:Array<HoraExtra> = new Array<HoraExtra>();  // Nuevo Listado de horas extra
    areas: Array<Area> = new Array<Area>();

    options: Pickadate.DateOptions = {
        clear: 'Borrar', // Clear button text
        close: 'Ok',    // Ok button text
        today: 'Hoy', // Today button text
        closeOnClear: true,
        closeOnSelect: false,
        format: 'yyyy-mm-dd',
        // formatSubmit: 'yyyy-mm-dd',
        // onClose: () => alert('Cerraste el picker.'),
        // onOpen: () => alert('abriste el picker.'),
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 10,    // Creates a dropdown of 10 years to control year,
      };

    errorMessageResourcesCabecera = {
        FechaSolicitud: {
            required: 'La Fecha es requerida'
        },
        AreaTrabajo: {
            required: 'El Área es requerida'
        },
    }

    errorMessageResources = {
        HoraDesde: {
            required: 'Este campo es requerido'
        },
        HoraHasta: {
            required: 'Este campo es requerido'
        },
        Actividad: {
            required: 'Necesita ingresar la actividad a realizar'
        }
    }

    cabeceraForm: FormGroup; // Formulario con informaciónd e la cabecera
    empleadoForm: FormGroup; // Formulario Empleado

    lturno: Array<Turno> = new Array<Turno>();
    turno: Turno = new Turno();
    dias: number = 0;  // 
    ldependientes: Array<User> = new Array<User>();
    planilla: EmpleadoPlanilla = new EmpleadoPlanilla();
    costoPorEmpleado: number  = 0; // Costo por Empleado

    autocomplete: any;
    submitted = false;
        
    he: HoraExtra = new HoraExtra();
    costoTotalSolicitud: number = 0; // Variable que contiene el Costo Total de la solicitud de Horas Extras

    solicitudHoraExtra: SolicitudHoraExtra = new SolicitudHoraExtra();

    // Apoyo
    siLcc: boolean;
    siMantenimiento: boolean;

    fechaHoraActual: Date;
    fechaLimite: Date;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private toast: MzToastService, 
        private heService: HorasExtrasService) { }

    ngOnInit() {
        this.buildFormEmpleado();
        this.buildFormCabecera();
        this.ObtenerFechaHoraActual();
        this.ObtenerAreas();
        this.ObtenerTurnos();
        this.ObtenerEmpleadosDependientes();

        this.seleccionarTipoHoraExtra(1);

        this.siLcc = false;
        this.siMantenimiento = false;

        this.solicitudHoraExtra.Lcc = 'N';
        this.solicitudHoraExtra.Mantenimiento = 'Y';

        // let hextra: HoraExtra = new HoraExtra();
        // hextra.Id = 1;
        // hextra.CodigoSap = 1;
        // hextra.NombreEmpleado = 'Franz Aruni';
        // hextra.IdTurno = 1;
        // hextra.Turno = 'PRIMER';
        // hextra.ActividadRealizada = "Limpieza de Frascos";
        // hextra.AclaracionTurno = '07:00 - 12:00';
        // hextra.NumeroHoras = 5;
        // hextra.Costo = 250.05;
        // this.lhorasextra.push(hextra);
    }

    buildFormCabecera(){
        this.cabeceraForm = this.formBuilder.group({
            FechaSolicitud: ['', Validators.required],
            AreaTrabajo: ['', Validators.required],
            TipoHoraExtra: [1, Validators.required]
        });
    }

    buildFormEmpleado(){
        this.empleadoForm = this.formBuilder.group({
            Empleado: ['', Validators.required],
            HoraDesde: ['00:00', Validators.required],
            HoraHasta: ['00:00', Validators.required],
            Actividad: ['', Validators.required],
            Turno: ['', Validators.required]
        })
    }

    selectLcc(){
        let apoyo: string = 'N';
        // debugger;
        if(this.siLcc) {
            this.siLcc = false;
            apoyo = 'N'
        }else { 
            this.siLcc = true;
            apoyo = 'Y'
        }
        this.solicitudHoraExtra.Lcc = apoyo;
    }

    selectMantenimiento(){
        let apoyo: string = 'N';
        // debugger;
        if(this.siMantenimiento) {
            this.siMantenimiento = false;
            apoyo = 'N'
        }else { 
            this.siMantenimiento = true;
            apoyo = 'Y'
        }
        this.solicitudHoraExtra.Mantenimiento = apoyo;
    }

    onSubmit() {
        let newhe: HoraExtra = new HoraExtra();

        if(!this.empleadoForm.valid){
            return;
        } else if(!this.cabeceraForm.valid){
            this.toast.show('Necesita completar los datos de la cabecera!', 2000, 'red');
            return;
        }
        this.submitted = true;
        this.calcularCantidadHoras(); // Calcula nuevamente las horas;

        this.he.Id = 0;
        this.he.IdSolicitudHoraExtra = 0;
        this.he.CodigoSap = this.empleadoForm.controls.Empleado.value;
        this.he.IdTurno = this.empleadoForm.controls.Turno.value;
        this.he.ActividadRealizada = this.empleadoForm.controls.Actividad.value;
        this.he.AclaracionTurno = this.empleadoForm.controls.HoraDesde.value + ' a ' + this.empleadoForm.controls.HoraHasta.value;

        newhe = this.he;
        this.lhorasextra.push({
            Id: 1, IdSolicitudHoraExtra: 1, 
            CodigoSap: this.he.CodigoSap, 
            NombreEmpleado: this.he.NombreEmpleado,
            TipoHoraExtra: this.he.TipoHoraExtra, 
            IdTurno: this.he.IdTurno, 
            Turno:this.he.Turno, 
            ActividadRealizada:this.he.ActividadRealizada, 
            AclaracionTurno:this.he.AclaracionTurno, 
            NumeroHoras:this.he.NumeroHoras, 
            Costo:this.he.Costo, 
            NombreTipoHoraExtra: '', 
            Sexo: this.he.Sexo});
        this.calcularTotal();
    }

    QuitarEmpleadoHorasExtras(emphe: HoraExtra) {
        if (this.lhorasextra.find(x => x == emphe)) {
            this.lhorasextra.splice(this.lhorasextra.indexOf(emphe), 1);
        }
        this.calcularTotal();
    }

    calcularTotal(){
        let sum = this.lhorasextra.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.Costo;
        }, 0);
        this.costoTotalSolicitud = sum;
    }

    ObtenerFechaHoraActual(){
        this.fechaLimite = new Date();

        this.loading.fadeIn();
        this.heService.getFechaHoraActual().subscribe(
            resp => {
                this.fechaHoraActual = resp;
                this.ObtenerTiempoDeFecha(this.fechaHoraActual);

            }, error => {
                this.toast.show('Ocurrio un error al obtener la hora actual', 1500);
            }
        ).add(()=> {
            this.loading.fadeOut();
        });
    }

    ObtenerTiempoDeFecha(fecha_a: Date){
        debugger
        var hour = new Date(fecha_a).getHours();
        var minutos = new Date(fecha_a).getMinutes();
        if(Number(minutos) > 9) {
            var n = hour +''+ minutos;
        } else {
            var n = hour +'0'+ minutos;
        }
        let hora_numero: number = Number(n);
        // alert(hora_numero);
        if(hora_numero > 1400) {
            this.esHorarioValido = false;
        } else {
            this.esHorarioValido = true;
        }
        // var hora = fecha_a.getHours.toString() + fecha_a.getMinutes.toString() + fecha_a.getSeconds.toString();
    }

    ObtenerAreas(){ // Obtiene los areas
        this.loading.fadeIn();
        this.heService.getAreas().subscribe(
            resp => {
                if(resp.status) {
                    this.areas = resp.body;
                    if(resp.length == 0) {
                        this.toast.show('No existen Areas', 1500);
                    } 
                } else {
                    this.toast.show('Ocurrio un error al obtener Areas', 1500);
                }
            }, error => {
                this.toast.show('Ocurrio un error al obtener Areas', 1500);
            }
        ).add(()=> {
            this.loading.fadeOut();
        });
    }

    ObtenerTurnos(){ // Obtiene los turnos disponibles
        this.loading.fadeIn();
        this.heService.getTurnos().subscribe(
            resp => {
                if(resp.status) {
                    this.lturno = resp.body;
                    if(resp.length == 0) {
                        this.toast.show('No existen turnos', 1500);
                    } 
                } else {
                    this.toast.show('Ocurrio un error al obtener Turnos', 1500);
                }
            }, error => {
                this.toast.show('Ocurrio un error al obtener Turnos', 1500);
            }
        ).add(()=> {
            this.loading.fadeOut();
        });
    }

    ObtenerTurnoPorId(Id: number){
        this.loading.fadeIn();
        this.heService.getTurnosPorId(Id).subscribe(
            resp => {
                if(resp.status) {
                    this.turno = resp.body;
                    this.empleadoForm.controls.HoraDesde.setValue(this.turno.HoraDesde);
                    this.empleadoForm.controls.HoraHasta.setValue(this.turno.HoraHasta);
                    this.he.Turno = this.turno.Turno;
                    this.calcularCantidadHoras();
                } else {
                    this.toast.show('Ocurrio un error al obtener información del Turno', 1500);
                }
            }, error => {
                this.toast.show('Ocurrio un error al obtener el Turno', 1500);
            }
        ).add(() => {
            this.loading.fadeOut();
        });
    }

    ObtenerEmpleadosDependientes(){
        let superior: string = localStorage.getItem('username');
        this.loading.fadeIn();
        this.heService.getDependientesPorUsername(superior).subscribe(
            resp => {
                if(resp.status) {
                    this.ldependientes = resp.body;
                } else {
                    this.toast.show('Ocurrio un error al obtener los dependientes', 1500);
                }
            }, error => {
                this.toast.show('Ocurrio un error al obtener los dependientes', 1500);
            }
        ).add(() => {
            this.loading.fadeOut();
        });
    }

  selectTurno(event) {
    // alert(event.target.value);
    this.ObtenerTurnoPorId(event.target.value);
  }

  calcularCantidadHoras(){
      if(this.planilla.SalarioBasico){
        let t = this.empleadoForm.controls.Turno.value;
        let hi = new Date('1990-01-01 ' + this.empleadoForm.controls.HoraDesde.value);
        let hf: any='';
        if(t == 3){
            hf = new Date('1990-01-02 ' + this.empleadoForm.controls.HoraHasta.value);
        } else {
            hf = new Date('1990-01-01 ' + this.empleadoForm.controls.HoraHasta.value);
        }
        
        let dif = hf.getTime() - hi.getTime();
        
        this.dias = dif/3600000;
        
        let salarioPorDia = this.planilla.SalarioBasico / 30;
        let salarioPorHora = salarioPorDia / 8;
        // let horas: number = fechaFinal - fechaInicial;
        this.calcularCostoPorEmpleado(salarioPorHora, this.dias, this.cabeceraForm.controls['TipoHoraExtra'].value, t); //  Verificar el tipo de hora extra
      } else {
          this.toast.show('Necesita seleccionar un empleado', 1500);
      }
  }

  calcularCostoPorEmpleado(SalarioPorHora: number, CantidadHorasExtras: number, TipoHoraExtra: number, Turno: number): void
  {
    let porcentaje: number = 0;
    if(this.he.Sexo == 'M') {
        porcentaje = 0.3;
    } else {
        porcentaje = 0.4;
    }

    let multiplicador = 0;
    switch(TipoHoraExtra){
        case 1: multiplicador = 2; break; // Lunes a Viernes
        case 2: multiplicador = 2; break; // Sabado
        case 3: multiplicador = 3; break; // Domingo
        case 4: multiplicador = 3; break; // Feriado
    }

    if(TipoHoraExtra == 1) {
        if(Turno == 3) {
            let costoPorHoras: number = SalarioPorHora * CantidadHorasExtras;
            let costoPorcentaje: number = costoPorHoras * porcentaje;
            this.costoPorEmpleado = costoPorHoras + costoPorcentaje; // (costoPorHoras*multiplicador) + costoPorcentaje;
        } else {
            this.costoPorEmpleado = SalarioPorHora * CantidadHorasExtras * multiplicador;
        }
    } else {
        let costoPorHoras: number = SalarioPorHora * CantidadHorasExtras;
        let costoPorcentaje: number = costoPorHoras * porcentaje;
        this.costoPorEmpleado = (costoPorHoras*multiplicador) + costoPorcentaje;
    }

    this.costoPorEmpleado = Number(parseFloat((Math.round(this.costoPorEmpleado * 100) /100).toString()).toFixed(2));

    this.he.NumeroHoras = this.dias; // Asignamos la cantidad de horas
    this.he.Costo = this.costoPorEmpleado; // Asignamos el Costo de las horas Extrass horas Extras
  }

  selectArea(event:any) {

  }

  seleccionarEmpleado(event) {
      let CodigoSAP: number = event;
      if(CodigoSAP) {
        this.obtenerPlanillaPorCodigoSap(CodigoSAP);
      }
  }

  seleccionarNombreEmpleado(nempleado: string, sexo: string){
    this.he.NombreEmpleado = nempleado;
    this.he.Sexo = sexo;
  }

  seleccionarTipoHoraExtra(tipoHE: number) : void {
    this.cabeceraForm.controls['TipoHoraExtra'].setValue(tipoHE);
    this.he.TipoHoraExtra = tipoHE;
    // console.log(this.cabeceraForm);
  }

  obtenerPlanillaPorCodigoSap(CodigoSAP: number){
    this.loading.fadeIn();
    this.heService.getPlanillaPorCodigoSap(CodigoSAP).subscribe(
        resp => {
            if(resp.status) {
                this.planilla = resp.body;
                this.calcularCantidadHoras();
            } else {
                this.planilla = new EmpleadoPlanilla();
                this.toast.show('Ocurrio un error en el Servidor', 1500);
            }
        }, error => {
            this.planilla = new EmpleadoPlanilla();
            this.toast.show('Ocurrio un error, Intente nuevamente', 1500);
        }
    ).add(() => {
        this.loading.fadeOut();
    });
  }

  // Permite guardar la solicitud
  onGuardarSolicitud(){
      if(!this.cabeceraForm.valid){
        this.toast.show('Es necesario que seleccione la Fecha de Solicitud, Area y el Tipo de Hora Extra', 2500, 'red');
        return;
      } else {
        if(this.lhorasextra.length == 0)  {
            this.toast.show('Necesita agregar empleados a la solicitud', 1500, 'red');
            return;
        } else {
            this.solicitudHoraExtra.Id = 0;
            this.solicitudHoraExtra.FechaSolicitud = this.cabeceraForm.controls.FechaSolicitud.value;
            this.solicitudHoraExtra.Solicitante = localStorage.getItem('username');
            this.solicitudHoraExtra.AreaTrabajo = this.cabeceraForm.controls.AreaTrabajo.value;
            this.solicitudHoraExtra.TipoHoraExtra = this.cabeceraForm.controls.TipoHoraExtra.value;
            this.solicitudHoraExtra.CostoTotal = this.costoTotalSolicitud;
            this.solicitudHoraExtra.FechaCreacionSolicitud = new Date();
            this.solicitudHoraExtra.Estado = 'Pendiente';
            this.solicitudHoraExtra.Empleados = this.lhorasextra;

            this.estaGuardando = true;

            this.heService.guardarSolicitudHorasExtras(this.solicitudHoraExtra).subscribe(resp => {
                if(resp.status){
                    this.toast.show('Se guardo la Solicitud de Horas Extras correctamente!', 2000, 'blue', () => this.router.navigate(['gh/solicitudes']));
                } else {
                    this.estaGuardando = false;
                    this.toast.show('No se pudo guardar la Solicitud! Intente nuevamente.', 2000, 'red');
                }
            }, error => {
                this.estaGuardando = false;
                this.toast.show('Ocurrio un error en el Servidor!', 2000, 'red'); // Si no hay conexión con el servidor;
            });
        }
      }
  }
}
