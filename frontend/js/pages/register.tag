<page-register id="page">
    <section class="iz-page-container">
        <div class="row">
            <div class="col-xs-12 col-sm-5 col-md-6">
                <h2 class="hidden-xs">Register</h2>
            </div>

            <div class="col-xs-12 col-sm-5 col-sm-offset-2 col-md-4 col-md-offset-2">
                <div class="well">
                    <h4>Register</h4>
                    <hr />
                    <form validate method="post" action="/register" bindaction="registerUser">
                        <div class="form-group">
                            <label class="control-label">Email</label>
                            <div class="input-group">
                                <span class="input-group-btn">
                                   <button class="btn btn-default" type="button" onclick="{changeInputType}"><i class="fa fa-fw fa-envelope"></i></button>
                                </span>
                                <input name="user[email]" type="email" class="form-control" value="{store.user.email}" required />
                            </div>
                        </div>

                        <iz-input-password name="user[password]"></iz-input-password> <!-- required attr here -->

                        <div class="row">
                            <div class="col-xs-7">
                              <p>
                                By registering you agree to our <a href="/terms">Terms</a> &amp; <a href="/privacy">Privacy</a>
                              </p>
                            </div>

                            <div class="col-xs-5">
                                <button type="submit" class="btn btn-block btn-primary">Register</button>
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
</page-register>
