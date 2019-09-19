import { Component, OnInit, NgModule } from '@angular/core';
import * as Chartist from 'chartist';
import { ApiService } from 'app/services/api.service';
import { DataService } from 'app/services/data.service';
import { DashboardDTO } from 'app/dto/dashboard.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataService, ApiService]
})
export class DashboardComponent implements OnInit {

  dadosAgora: DashboardDTO = DashboardDTO.instance();
  loading: Boolean = true;

  constructor(private dataService: DataService) { }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  ngOnInit() {
    this.dataService.getAgora().subscribe(
      (registro) => {
        console.log(registro);
        this.dadosAgora = registro;

        dataHumidityChart.series = [
          this.dadosAgora.getSemana().getUmidade().map(x => x.getMax()),
          this.dadosAgora.getSemana().getUmidade().map(x => x.getMin()),
        ];
        humidityChart.update(dataHumidityChart);

        dataWindChart.series = [
          this.dadosAgora.getAno().getVento().map(x => x.getMax()),
          this.dadosAgora.getAno().getVento().map(x => x.getAvg()),
          this.dadosAgora.getAno().getVento().map(x => x.getMin()),
        ];
        windChart.update(dataWindChart);

        dataThermometerChart.series = [
          this.dadosAgora.getSemana().getTemperatura().map(x => x.getMax()),
          this.dadosAgora.getSemana().getTemperatura().map(x => x.getMin()),
        ];
        thermometerChart.update(dataThermometerChart);

        dataRainChart.series = [
          this.dadosAgora.getAno().getChuva().map(x => x.getTotal()),
        ];
        rainChart.update(dataRainChart);

        this.loading = false;
      }
    );

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    var dataHumidityChart: any = {
      labels: [],
      series: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    };

    const optionsHumidityChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var humidityChart = new Chartist.Line('#humidityChart', dataHumidityChart, optionsHumidityChart);

    this.startAnimationForLineChart(humidityChart);


    /* ----------==========     Temperatura Chart initialization    ==========---------- */

    const dataThermometerChart: any = {
      labels: [],
      series: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    };

    const optionsThermometerChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var thermometerChart = new Chartist.Line('#thermometerChart', dataThermometerChart, optionsThermometerChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(thermometerChart);

    /* ----------==========     Wind Chart initialization    ==========---------- */

    var dataWindChart = {
      labels: [],
      series: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
    };
    var optionsWindChart = {
      axisX: {
        showGrid: false,
        offset: 60
      },
      seriesBarDistance: 10,
      low: 0,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };
    var responsiveOptionsWindChart: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 10,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var windChart = new Chartist.Bar('#windChart', dataWindChart, optionsWindChart, responsiveOptionsWindChart);

    //start animation for the Wind Chart
    this.startAnimationForBarChart(windChart);

    /* ----------==========     Rain Subscription Chart initialization    ==========---------- */

    var dataRainChart = {
      labels: [],
      series: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
    };
    var optionsRainChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var rainChart = new Chartist.Bar('#rainChart', dataRainChart, optionsRainChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(rainChart);
  }
}
