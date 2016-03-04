<page-index>
    <section class="container" style="padding-top: 51px;padding-bottom: 51px;">
        <div class="row">
            <div class="col-xs-12">
                <!-- panel -->
                <div class="well">
                    <div class="row">
                        <div class="col-xs-12 col-sm-4 col-md-3">
                            <iz-rating-overview-table>
                            </iz-rating-overview-table>
                        </div>
                        <div class="col-xs-12 col-sm-8 col-md-9">
                            <iz-rating-chart>
                            </iz-rating-chart>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <iz-rating-list>
        </iz-rating-list>
    </section>
    <script>
        this.on('mount', function () {
            console.log('page-index mounted');
        });
    </script>
</page-index>
