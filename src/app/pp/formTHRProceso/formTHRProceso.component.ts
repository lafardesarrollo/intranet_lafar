import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Monitoreothrproceso } from '../monitoreothrproceso';
import { Areas } from '../../admin-intranet/areas/areas';
import { AreasService } from '../../admin-intranet/areas/areas.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { SeccionesService } from '../../admin-intranet/secciones/secciones.service';
import { Secciones } from '../../admin-intranet/secciones/secciones';
import { EtapasProcesoService } from '../etapasproceso.service';
import { Etapasproceso } from '../etapasproceso';
import { PpService } from '../pp.service';
import { ProductoProceso, RequestProductoProceso } from '../productoproceso';
import { Higrotermometro } from '../../metrologia/higrotermometro';
import { HigrotermometroService } from '../../metrologia/higrotermometro.service';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-formthrproceso',
  templateUrl: './formTHRProceso.component.html',
  styleUrls: ['./formTHRProceso.component.scss']
})
export class FormTHRProcesoComponent implements OnInit {
  // Busqueda por Lote
  btnBusquedaLote: Boolean = true;

  // Area
  selectArea: any;
  areas: Array<Areas> = new Array<Areas>();
  secciones: Array<Secciones> = new Array<Secciones>();
  etapasprocesos: Array<Etapasproceso> = new Array<Etapasproceso>();
  productosprocesos: Array<ProductoProceso> = new Array<ProductoProceso>();
  monitoreo: Monitoreothrproceso = new Monitoreothrproceso();

  higrotermometros: Array<Higrotermometro> = new Array<Higrotermometro>();
  higrotermometro: Higrotermometro = new Higrotermometro();

  // Proceso
  procesoValue: any = 'PP';
  productoAll: string;
  existHigrotermometro: Boolean = false;

  // Error
  mensaje: any = '';

  constructor(private servArea: AreasService,
    private servSeccion: SeccionesService,
    private servEtapaProceso: EtapasProcesoService,
    private servProducto: PpService,
    private servHigrotermometro: HigrotermometroService,
    private servToast: MzToastService,
    private route: Router
  ) { }

  ngOnInit() {
    this.onLoadAreas();
    this.monitoreo.username = localStorage.getItem('username');
    this.monitoreo.usuario_creacion = localStorage.getItem('username');
    this.monitoreo.usuario_modificacion = localStorage.getItem('username');
  }

  // Carga de informacion de areas productivas
  onLoadAreas() {
      this.servArea.getAreasForProduccion().subscribe(
        data => {
          this.areas = data.body;
          // console.log(this.areas);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.log('Ocurrio un error:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
          }
        }
      );
  }

  onLoadSecciones() {
    this.servSeccion.getSeccionForArea(this.selectArea).subscribe(
      data => {
        this.secciones = data['body'];
        // console.log(this.secciones);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
        }
      }
    );
  }

  onLoadEtapasProceso(datos) {
    this.servEtapaProceso.getEtapaProceso(datos).subscribe(
      data => {
        this.etapasprocesos = data['body'];
        // console.log(this.etapasprocesos);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
        }
      }
    );
  }


  onSelectArea() {
    // console.log(this.selectArea);
    this.onLoadSecciones();
    this.onSelectProceso(this.procesoValue);
  }

  onSelectSeccion() {
    // console.log(this.monitoreo);
    this.onLoadHigrotermometroForSeccion(this.monitoreo.id_seccion);
  }

  onSelectProceso(valor: string) {
    debugger;
    // console.log(valor + ' - ' + this.selectArea);
    let valorPP: number = 1;
    if (valor == 'PD') {
      valorPP = 2;
    }else {
      valorPP = 1;
    }

    let datosProceso: any = {
      id_proceso: valorPP,
      id_area: this.selectArea
    };

    this.onLoadEtapasProceso(datosProceso);
    // console.log(valorPP);
  }

  onValidaCampoLote() {
    // console.log('--->  ' +  this.monitoreo.lote);
  }

  onLoadProductoForLote(event: any) {
    // console.log(this.monitoreo.lote);
    if (!this.verificaSiBuscaLote()) {
      this.existHigrotermometro = true;
      this.mensaje = 'Ingrese un número de Lote';
    } else {
      this.existHigrotermometro = false;
      if (event.keyCode == 13) {
        // console.log(this.monitoreo.lote);
        this.productosprocesos = [];
        this.onLoadProductoProceso(this.monitoreo.lote);
      }
    }
  }

  onLoadProductoForLoteButton() {
    this.productosprocesos = [];
    this.onLoadProductoProceso(this.monitoreo.lote);
  }

  onLoadProductoProceso(lote) {
    let prod: ProductoProceso = new ProductoProceso();
    let req: RequestProductoProceso = new RequestProductoProceso();
    req.lote = lote;
    req.tipo = this.procesoValue;
    this.openLoading();
    let nLote: string = lote;
    // this.servProducto.getProductoForLote(nLote.replace('/', '|')).subscribe(
    this.servProducto.getProductoForTipoLote(req).subscribe(
      data => {
        this.closeLoading();
        if (data['length'] > 0) {
          prod = data['body'][0];
          this.monitoreo.codigo_producto = prod.ItemCode;
          this.monitoreo.nombre_producto = prod.ItemName;
          // console.log(this.productosprocesos);
          this.existHigrotermometro = false;
        } else {
          this.monitoreo.codigo_producto = '';
          this.monitoreo.nombre_producto = '';
          this.mensaje = 'El numero de Lote introducido no trajo ningun producto';
          this.existHigrotermometro = true;
        }
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        // this.servToast.show('El servidor respondio:' + err.status + '}, body was: {' + err.error + '}', 2000, 'red');
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
        }
      }
    );
  }

  onSelectEtapa() {

  }

  onSelectProducto() {
    let p: any = this.productoAll.split('|');
    // alert(p[0]);
    this.monitoreo.codigo_producto = p[0];
    this.monitoreo.nombre_producto = p[1];
  }

  onSaveMonitoreoTHRProceso() {
    if (this.verificaSiEsHigroscopico()) {
      this.existHigrotermometro = false;
      this.onGuardarTHRProceso();
    } else {
      this.existHigrotermometro = true;
      this.mensaje = 'NO PUEDE INICIAR O CONTINUAR CON EL PROCESO, Los valores de la Humedad estan fuera de Rango';
    }
    // console.log(this.monitoreo);
  }

  onGuardarTHRProceso() {
    this.servEtapaProceso.saveTHRProceso(this.monitoreo).subscribe(
      data => {
        if (data.status == 200) {
          this.servToast.show('Su registro fue realizado correctamente ', 4000, 'green rounded', () => { this.route.navigate(['/procprod/repthrproceso']); });
        }else {
          this.servToast.show('No se guardo el registro!', 4000, 'red rounded');
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
        this.servToast.show('No se guardo. Ocurrio un error en el Servidor ', 4000, 'red rounded');
      }
    );
  }

  onCorrigueTemperatura() {
    this.monitoreo.temperatura_corregido =
    Number((this.devuelveTemparaturaCorregida(this.monitoreo.temperatura_original, this.higrotermometro)).toFixed(2));
    this.existHigrotermometro = false;
    if (this.monitoreo.temperatura_corregido == 10000) {
      this.monitoreo.temperatura_corregido = 0;
      this.mensaje = 'Los valores de la temperatura se encuentran fuera de rango.';
      this.existHigrotermometro = true;
    }
  }

  onCorrigueHumedad() {
    this.monitoreo.humedad_relativa_corregido =
    Number((this.devuelveHRCorregida(this.monitoreo.humedad_relativa_original, this.higrotermometro)).toFixed(2));
    this.existHigrotermometro = false;
  }

  // Higrotermometro
  onLoadHigrotermometroForSeccion(seccion) {
    this.servHigrotermometro.getHigrotermometro(seccion).subscribe(
      data => {
        this.higrotermometro = data['body'][0];
        // console.log(this.higrotermometro);
        let n: number = data['length'];
        if (n == 0) {
          this.existHigrotermometro = true;
          this.mensaje = 'Esta sección no tiene un higrotermómetro asignado';
        } else {
          this.existHigrotermometro = false;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
        }
      }
    );
  }

  devuelveTemparaturaCorregida(temperatura: number, h: Higrotermometro): number {
    let t0: number = 0;
    let t1: number = 0;
    let t2: number = 0;
    let x2: number = 0;
    let x1: number = 0;
    let x0: number = 0;
    let temperatura_corregida: number = 0;

    if (h.ipt_5 > 0) { // Determina la validación en caso de que contenga 5 intervalos de referencia
      if (temperatura < h.ipt_1 || temperatura > h.ipt_5) { // Valida si el valor de la temperatura esta fuera de rango
        // si esta fuera de rango
        return 10000;
      }else {
        if (temperatura == h.ipt_1 || temperatura == h.ipt_2 || temperatura == h.ipt_3 ||
          temperatura == h.ipt_4 || temperatura == h.ipt_5) {
            // Valida si los valores ingresados son iguales por lo tanto retorna el mismo valor
            temperatura_corregida = temperatura;
        } else {
          if (temperatura > h.ipt_1 && temperatura < h.ipt_2) {
            t2 = h.ipt_2;
            t0 = h.ipt_1;
            x2 = h.ct_2;
            x0 = h.ct_1;
          } else if (temperatura > h.ipt_2 && temperatura < h.ipt_3) {
            t2 = h.ipt_3;
            t0 = h.ipt_2;
            x2 = h.ct_3;
            x0 = h.ct_2;
          } else if (temperatura > h.ipt_3 && temperatura < h.ipt_4) {
            t2 = h.ipt_4;
            t0 = h.ipt_3;
            x2 = h.ct_4;
            x0 = h.ct_3;
          } else if (temperatura > h.ipt_4 && temperatura < h.ipt_5) {
            t2 = h.ipt_5;
            t0 = h.ipt_4;
            x2 = h.ct_5;
            x0 = h.ct_4;
          }
          x1 = ((x2 * (temperatura - t0)) + (x0 * (t2 - temperatura))) / (t2 - t0);
          temperatura_corregida = x1 + temperatura; // REdondear el decimal
        }
      }
    } else {
      if (temperatura == h.ipt_1 || temperatura == h.ipt_2 || temperatura == h.ipt_3 ||
        temperatura == h.ipt_4) {
          // Valida si los valores ingresados son iguales por lo tanto retorna el mismo valor
          temperatura_corregida = temperatura;
      } else {
        if (temperatura > h.ipt_1 && temperatura < h.ipt_2) {
          t2 = h.ipt_2;
          t0 = h.ipt_1;
          x2 = h.ct_2;
          x0 = h.ct_1;
        } else if (temperatura > h.ipt_2 && temperatura < h.ipt_3) {
          t2 = h.ipt_3;
          t0 = h.ipt_2;
          x2 = h.ct_3;
          x0 = h.ct_2;
        } else if (temperatura > h.ipt_3 && temperatura < h.ipt_4) {
          t2 = h.ipt_4;
          t0 = h.ipt_3;
          x2 = h.ct_4;
          x0 = h.ct_3;
        }
        x1 = ((x2 * (temperatura - t0)) + (x0 * (t2 - temperatura))) / (t2 - t0);
        temperatura_corregida = x1 + temperatura; // REdondear el decimal
      }
    }

    return temperatura_corregida;
  }

  devuelveHRCorregida(hr: number, h: Higrotermometro): number {
    let h0: number = 0;
    let h1: number = 0;
    let h2: number = 0;
    let xhr2: number = 0;
    let xhr1: number = 0;
    let xhr0: number = 0;
    let humedad_corregida: number = 0;


    if (this.validaPromedioTemperaturaHR(h.tempHR1, h.tempHR2, this.monitoreo.temperatura_original) == true) {
      if (hr == h.iphr_1_1 || hr == h.iphr_1_2 || hr == h.iphr_1_3 || hr == h.iphr_1_4 || hr == h.iphr_1_5) {
        humedad_corregida = hr;
      }else {
        if (hr > h.iphr_1_1 && hr < h.iphr_1_2) {
          h2 = h.iphr_1_2;
          h0 = h.iphr_1_1;
          xhr2 = h.chr_1_2;
          xhr0 = h.chr_1_1;
        } else if (hr > h.iphr_1_2 && hr < h.iphr_1_3) {
          h2 = h.iphr_1_3;
          h0 = h.iphr_1_2;
          xhr2 = h.chr_1_3;
          xhr0 = h.chr_1_2;
        } else if (hr > h.iphr_1_3 && hr < h.iphr_1_4) {
          h2 = h.iphr_1_4;
          h0 = h.iphr_1_3;
          xhr2 = h.chr_1_4;
          xhr0 = h.chr_1_3;
        } else if (hr > h.iphr_1_4 && hr < h.iphr_1_5) {
          h2 = h.iphr_1_5;
          h0 = h.iphr_1_4;
          xhr2 = h.chr_1_5;
          xhr0 = h.chr_1_4;
        }
        xhr1 = ((xhr2 * (hr - h0)) + (xhr0 * (h2 - hr))) / (h2 - h0);
        humedad_corregida = xhr1 + hr; // REdondear el decimal
      }
    }
    if (this.validaPromedioTemperaturaHR(h.tempHR1, h.tempHR2, this.monitoreo.temperatura_original) == false) {
      if (hr == h.iphr_2_1 || hr == h.iphr_2_2 || hr == h.iphr_2_3 || hr == h.iphr_2_4 || hr == h.iphr_2_5) {
        humedad_corregida = hr;
      }else {
        if (hr > h.iphr_2_1 && hr < h.iphr_2_2) {
          h2 = h.iphr_2_2;
          h0 = h.iphr_2_1;
          xhr2 = h.chr_2_2;
          xhr0 = h.chr_2_1;
        } else if (hr > h.iphr_2_2 && hr < h.iphr_2_3) {
          h2 = h.iphr_2_3;
          h0 = h.iphr_2_2;
          xhr2 = h.chr_2_3;
          xhr0 = h.chr_2_2;
        } else if (hr > h.iphr_2_3 && hr < h.iphr_2_4) {
          h2 = h.iphr_2_4;
          h0 = h.iphr_2_3;
          xhr2 = h.chr_2_4;
          xhr0 = h.chr_2_3;
        } else if (hr > h.iphr_2_4 && hr < h.iphr_2_5) {
          h2 = h.iphr_2_5;
          h0 = h.iphr_2_4;
          xhr2 = h.chr_2_5;
          xhr0 = h.chr_2_4;
        }
        xhr1 = ((xhr2 * (hr - h0)) + (xhr0 * (h2 - hr))) / (h2 - h0);
        humedad_corregida = xhr1 + hr; // REdondear el decimal
      }
    }
    if (this.monitoreo.temperatura_original == h.tempHR2) {
      if (hr == h.iphr_2_1 || hr == h.iphr_2_2 || hr == h.iphr_2_3 || hr == h.iphr_2_4 || hr == h.iphr_2_5) {
        humedad_corregida = hr;
      }else {
        if (hr > h.iphr_2_1 && hr < h.iphr_2_2) {
          h2 = h.iphr_2_2;
          h0 = h.iphr_2_1;
          xhr2 = h.chr_2_2;
          xhr0 = h.chr_2_1;
        } else if (hr > h.iphr_2_2 && hr < h.iphr_2_3) {
          h2 = h.iphr_2_3;
          h0 = h.iphr_2_2;
          xhr2 = h.chr_2_3;
          xhr0 = h.chr_2_2;
        }else if (hr > h.iphr_2_3 && hr < h.iphr_2_4) {
          h2 = h.iphr_2_4;
          h0 = h.iphr_2_3;
          xhr2 = h.chr_2_4;
          xhr0 = h.chr_2_3;
        } else if (hr > h.iphr_2_4 && hr < h.iphr_2_5) {
          h2 = h.iphr_2_5;
          h0 = h.iphr_2_4;
          xhr2 = h.chr_2_5;
          xhr0 = h.chr_2_4;
        }
        xhr1 = ((xhr2 * (hr - h0)) + (xhr0 * (h2 - hr))) / (h2 - h0);
        humedad_corregida = xhr1 + hr; // REdondear el decimal
      }
    }
    if (this.validaPromedioTemperaturaHR(h.tempHR2, h.tempHR3, this.monitoreo.temperatura_original)) {
      if (hr == h.iphr_2_1 || hr == h.iphr_2_2 || hr == h.iphr_2_3 || hr == h.iphr_2_4 || hr == h.iphr_2_5) {
        humedad_corregida = hr;
      }else {
        if (hr > h.iphr_2_1 && hr < h.iphr_2_2) {
          h2 = h.iphr_2_2;
          h0 = h.iphr_2_1;
          xhr2 = h.chr_2_2;
          xhr0 = h.chr_2_1;
        }else if (hr > h.iphr_2_2 && hr < h.iphr_2_3) {
          h2 = h.iphr_2_3;
          h0 = h.iphr_2_2;
          xhr2 = h.chr_2_3;
          xhr0 = h.chr_2_2;
        }else if (hr > h.iphr_2_3 && hr < h.iphr_2_4) {
          h2 = h.iphr_2_4;
          h0 = h.iphr_2_3;
          xhr2 = h.chr_2_4;
          xhr0 = h.chr_2_3;
        }else if (hr > h.iphr_2_4 && hr < h.iphr_2_5) {
          h2 = h.iphr_2_5;
          h0 = h.iphr_2_4;
          xhr2 = h.chr_2_5;
          xhr0 = h.chr_2_4;
        }
        xhr1 = ((xhr2 * (hr - h0)) + (xhr0 * (h2 - hr))) / (h2 - h0);
        humedad_corregida = xhr1 + hr; // REdondear el decimal
      }
    }
    if (this.validaPromedioTemperaturaHR(h.tempHR2, h.tempHR3, this.monitoreo.temperatura_original) == false) {
      if (hr == h.iphr_3_1 || hr == h.iphr_3_2 || hr == h.iphr_3_3 || hr == h.iphr_3_4 || hr == h.iphr_3_5) {
        humedad_corregida =  hr;
      }else {
        if (hr > h.iphr_3_1 && hr < h.iphr_3_2) {
          h2 = h.iphr_3_2;
          h0 = h.iphr_3_1;
          xhr2 = h.chr_3_2;
          xhr0 = h.chr_3_1;
        }else if (hr > h.iphr_3_2 && hr < h.iphr_3_3) {
          h2 = h.iphr_3_3;
          h0 = h.iphr_3_2;
          xhr2 = h.chr_3_3;
          xhr0 = h.chr_3_2;
        }else if (hr > h.iphr_3_3 && hr < h.iphr_3_4) {
          h2 = h.iphr_3_4;
          h0 = h.iphr_3_3;
          xhr2 = h.chr_3_4;
          xhr0 = h.chr_3_3;
        }else if (hr > h.iphr_3_4 && hr < h.iphr_3_5) {
          h2 = h.iphr_3_5;
          h0 = h.iphr_3_4;
          xhr2 = h.chr_3_5;
          xhr0 = h.chr_3_4;
        }
        xhr1 = ((xhr2 * (hr - h0)) + (xhr0 * (h2 - hr))) / (h2 - h0);
        humedad_corregida = xhr1 + hr; // REdondear el decimal
      }
    }
    if (this.monitoreo.temperatura_original == h.tempHR3) {
      if (hr == h.iphr_3_1 || hr == h.iphr_3_2 || hr == h.iphr_3_3 || hr == h.iphr_3_4 || hr == h.iphr_3_5) {
        humedad_corregida = hr;
      }else {
        if (hr > h.iphr_3_1 && hr < h.iphr_3_2) {
          h2 = h.iphr_3_2;
          h0 = h.iphr_3_1;
          xhr2 = h.chr_3_2;
          xhr0 = h.chr_3_1;
        }else if (hr > h.iphr_3_2 && hr < h.iphr_3_3) {
          h2 = h.iphr_3_3;
          h0 = h.iphr_3_2;
          xhr2 = h.chr_3_3;
          xhr0 = h.chr_3_2;
        }else if (hr > h.iphr_3_3 && hr < h.iphr_3_4) {
          h2 = h.iphr_3_4;
          h0 = h.iphr_3_3;
          xhr2 = h.chr_3_4;
          xhr0 = h.chr_3_3;
        }else if (hr > h.iphr_3_4 && hr < h.iphr_3_5) {
          h2 = h.iphr_3_5;
          h0 = h.iphr_3_4;
          xhr2 = h.chr_3_5;
          xhr0 = h.chr_3_4;
        }
        xhr1 = ((xhr2 * (hr - h0)) + (xhr0 * (h2 - hr))) / (h2 - h0);
        humedad_corregida = xhr1 + hr; // REdondear el decimal
      }
    }

    return humedad_corregida;
  }

  validaPromedioTemperaturaHR(temp1: number, temp2: number, temperatura: number): Boolean {
    let suma1: number = Number(temp1) + Number(temp2);
    let promedio: number = (suma1) / 2;
    if (temperatura < promedio) {
        return true;
    }else {
        return false;
    }
  }

  verificaSiEsHigroscopico(): Boolean {
    if (this.monitoreo.higroscopico && this.monitoreo.humedad_relativa_corregido > 45) {
      return false;
    }else if (this.monitoreo.humedad_relativa_corregido > 60) {
      return false;
    }else {
      return true;
    }
  }

  verificaSiBuscaLote(): Boolean {
    // console.log(this.monitoreo.lote);
    if (this.monitoreo.lote.length > 0) {
      this.btnBusquedaLote = false;
      return true;
    } else {
      this.btnBusquedaLote = true;
      return false;
    }
  }

  openLoading() {
    const loading = $('#loading');
    loading.fadeIn();
  }

  closeLoading() {
      const loading = $('#loading');
      loading.fadeOut();
  }

}
