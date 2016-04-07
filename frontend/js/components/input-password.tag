<iz-input-password>
    <div class="form-group">
      <label class="control-label">Password</label>
      <div class="input-group">
          <span class="input-group-btn">
             <button class="btn btn-default" type="button"><i class="fa fa-fw fa-lock"></i></button>
          </span>
          <input name="{opts.name}" type="password" class="form-control" required data-parsley-length="[6, 45]"/>
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" onclick="{changeInputType}"><i class="fa fa-fw fa-eye"></i></button>
          </span>
      </div>
    </div>

    <script>
        var self = this;

        self.on('mount', function() {
            console.log(this);
        });

        self.changeInputType = function(event) {
            var input = $("input", this.root);

            if (input.attr('type') == 'password') {
                input.attr('type', 'text');
                return input.next().find('.fa-eye').removeClass('fa-eye').addClass('fa-eye-slash')
            }

            input.attr('type', 'password');
            return input.next().find('.fa-eye-slash').removeClass('fa-eye-slash').addClass('fa-eye')
        }
    </script>
</iz-input-password>
