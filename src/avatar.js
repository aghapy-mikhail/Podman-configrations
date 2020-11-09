/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Avatar } from 'theme-ui'

export default ({
  size = 64,
  ...props
}) =>
  <div
    {...props}
    sx={{
      width: size,
      height: size,
      borderRadius: 9999,
      bg: 'white',
    }}>
    <Avatar
      size={size}
      src="https://s3.ap-south-1.amazonaws.com/akash.r/Github_Profile/avatar.png"
    />
  </div>
