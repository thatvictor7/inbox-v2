import React from 'react'

const ComposeMessage = (props) => {
    const { handleChange,handleSubmit,handleBody } = props
    return (
        <form class="form-horizontal well" onSubmit={() => handleSubmit()}>
            <div class="form-group">
              <div class="col-sm-8 col-sm-offset-2">
                <h4>Compose Message</h4>
              </div>
            </div>
            <div class="form-group">
              <label for="subject" class="col-sm-2 control-label">Subject</label>
              <div class="col-sm-8">
                    <input  onChange={(e) => handleChange(e)} type="text" class="form-control" id="subject" placeholder="Enter a subject" name="subject"/>
              </div>
            </div>
            <div class="form-group">
              <label for="body" class="col-sm-2 control-label">Body</label>
              <div class="col-sm-8">
                    <textarea  onChange={(e) => handleBody(e)} name="body" id="body" class="form-control"></textarea>
                    {/* <input value={handleStateForm} onChange={(e) => handleChange(e)} type="text" class="form-control" id="body" name="body" /> */}
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-8 col-sm-offset-2">
                <input type="submit" value="Send" class="btn btn-primary"/>
              </div>
            </div>
        </form>
    )
}

export default ComposeMessage