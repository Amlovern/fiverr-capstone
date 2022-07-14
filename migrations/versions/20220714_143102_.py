"""empty message

Revision ID: 97290f2c80fd
Revises: dfd87b3d0fa5
Create Date: 2022-07-14 14:31:02.934564

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '97290f2c80fd'
down_revision = 'dfd87b3d0fa5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('orders', sa.Column('gigImage', sa.String(length=1000), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('orders', 'gigImage')
    # ### end Alembic commands ###
