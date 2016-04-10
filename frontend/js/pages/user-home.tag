<page-user-home id="page">
    <section class="iz-page-container">
        <div class="row">
            <div class="col-xs-12">
                <h1>This is {store.user.email} home page</h1>
            </div>
        </div>
    </section>

    <script>
        var self = this;

        self.mixin('store');

        self.on('mount', function () {
            console.log(self);
        });
    </script>
</page-user-home>
