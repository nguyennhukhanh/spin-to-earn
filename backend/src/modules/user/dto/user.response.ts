import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: { code: 200, message: 'Successful' } })
  meta: object;

  @ApiProperty({
    example: {
      user: {
        createdAt: '2024-09-06T16:32:51.733Z',
        updatedAt: '2024-09-06T16:33:11.000Z',
        deletedAt: null,
        id: 10,
        walletAddress: '0xDD55711faE3cE3C7z2C6A6C7599565279e098123',
        nonce: 9,
        fullName: null,
        isActive: true,
      },
      tokens: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiNGI1NjljMjMtZjljNC00ZjU5LWJjZWQtNDkxZDIzMzc1MDc0IiwiaWF0IjoxNzI1Njg5NTMzLCJleHAiOjE3MjU2OTEzMzN9.HFjz9HA7mkbJRfL-et5SE9v3uFRtcNUQd8ZiGsusSJ4',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiNGI1NjljMjMtZjljNC00ZjU5LWJjZWQtNDkxZDIzMzc1MDc0IiwiaWF0IjoxNzI1Njg5NTMzLCJleHAiOjE3MjU3NzU5MzN9.e8-AiJtVS2DLR73K4tY396FQEH3UdzKD9Xemg-d7XJQ',
        expiresAt: 1725691333806,
      },
    },
  })
  data: object;
}
