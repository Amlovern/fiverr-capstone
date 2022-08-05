"""empty message

Revision ID: 804d7538a8d0
Revises: 97290f2c80fd
Create Date: 2022-08-05 19:28:55.721225

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '804d7538a8d0'
down_revision = '97290f2c80fd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('createdAt', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('createdAt', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('gigs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('categoryId', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('image', sa.String(length=1000), nullable=True),
    sa.Column('queue', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('deliveryTimeline', sa.Integer(), nullable=False),
    sa.Column('returnTimeline', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['categoryId'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('gigId', sa.Integer(), nullable=False),
    sa.Column('gigImage', sa.String(length=1000), nullable=True),
    sa.Column('deliveryInstructions', sa.Text(), nullable=True),
    sa.Column('placed', sa.DateTime(), nullable=False),
    sa.Column('due', sa.DateTime(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['gigId'], ['gigs.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('orders')
    op.drop_table('gigs')
    op.drop_table('users')
    op.drop_table('categories')
    # ### end Alembic commands ###
