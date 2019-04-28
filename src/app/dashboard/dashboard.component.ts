import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ApiService } from 'app/services/api.service';
import { DataService } from 'app/services/data.service';
import { MedicaoDTO } from 'app/dto/medicao.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataService, ApiService]
})
export class DashboardComponent implements OnInit {

  dadosAgora: MedicaoDTO = MedicaoDTO.instance();

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
      }
      );

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    const dataHumidityChart: any = {
      labels: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
      series: [
        [70, 80, 60, 65, 80, 90, 95],
        [65, 83, 50, 58, 83, 85, 90]
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
      labels: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
      series: [
        [9, 15, 8, 12, 5, 12, 17],
        [20, 21, 25, 16, 12, 29, 33]
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
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      series: [
        [30, 14, 13, 17, 25, 18, 15, 17, 19, 21, 35, 27],
        [20, 7, 8, 12, 22, 15, 12, 17, 5, 7, 12, 19],
        [10, 3, 2, 7, 10, 5, 3, 17, 0, 2, 3, 7],

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

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
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
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }
}