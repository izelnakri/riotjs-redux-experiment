<page-login id="page">
    <section class="iz-page-container">
        <div class="row">
            <div class="col-xs-12 col-sm-5 col-md-6">
                <h2 class="hidden-xs">Login</h2>
            </div>

            <div class="col-xs-12 col-sm-5 col-sm-offset-2 col-md-4 col-md-offset-2">
                <div class="well">
                    <h4>Login</h4>
                    <hr />
                    <form validate method="POST" action="/login">
                        <div class="form-group">
                            <label class="control-label">Email</label>
                            <div class="input-group">
                                <span class="input-group-btn">
                                   <button class="btn btn-default" type="button" onclick="{changeInputType}"><i class="fa fa-fw fa-envelope"></i></button>
                                </span>
                                <input name="user[email]" type="email" class="form-control" required />
                            </div>
                        </div>

                        <iz-input-password name="user[password]"></iz-input-password>

                        <div class="row">
                            <div class="col-xs-7">
                                <a href="/forgot-password" class="btn btn-link">Forgot your password?</a>
                            </div>

                            <div class="col-xs-5">
                                <button type="submit" class="btn btn-block btn-primary">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <script>
        this.on('mount', function () {
            console.log('page-index mounted');
        });
    </script>
</page-login>
